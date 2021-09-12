import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { DateTime } from 'luxon';
import { promisify } from 'util';

import {
  dbUserCreate,
  dbUserEmailExists,
  dbUserGetFromCredentials,
  dbUserGet,
} from './db';
import { dbTeamExists } from '../teams/db';
import Logger from '../../../shared/helpers/Logger';
import {
  handleRequest,
  createUserToken,
  verifyUserTokenAndSession,
} from '../../api/apiUtils';
import {
  badRequestException,
  notFoundException,
  unauthorizedException,
} from '../../api/apiExceptions';
import { createGuid } from '../../../shared/utils/baseUtils';
import { isStrictStringOrThrow } from '../../../shared/utils/typeUtils';
import { validUserCreateParams, userRemovePII } from './utils';

import { ServiceHandlerOpts, DBClient } from '../../serverTypes';
import { EntityUser, UserAuthResponse } from '../../../shared/types/entityTypes';

class UsersHandler {
  client: DBClient;
  logger: Logger;

  constructor(opts: ServiceHandlerOpts) {
    const { client, logger } = opts;
    this.client = client;
    this.logger = logger;
  }

  register = async (req: Request, res: Response) => {
    this.logger.logRequest(req);

    const userId = createGuid('user');
    const params = validUserCreateParams(req.body);
    const utcTimestamp = DateTime.now().toMillis();

    const emailExists = await dbUserEmailExists(this.client, params.email);
    if (emailExists) {
      return badRequestException(res, `A user with email '${params.email}' already exists`);
    }

    if (params.roleId === 'role_owner' && params.teamId) {
      return badRequestException(res, 'Cannot create user as owner of an existing team');
    }

    if (params.roleId === 'role_viewer' || params.roleId === 'role_editor') {
      if (!params.teamId) {
        return badRequestException(res, 'Cannot create user as viewer/editor without an existing team');
      }

      const teamExists = await dbTeamExists(this.client, params.teamId);
      if (!teamExists) {
        return badRequestException(
          res,
          `Cannot created user as viewer/editor because team: '${params.teamId}' doesn't exist`,
        );
      }
    }

    const hashedPassword = await promisify(bcrypt.hash)(params.password, 10);

    const user: EntityUser = {
      userId,
      roleId: params.roleId,
      teamId: params.teamId,
      displayName: params.displayName,
      imgUrl: params.imgUrl,
      firstName: params.firstName,
      lastName: params.lastName,
      email: params.email,
      utcTimeCreated: utcTimestamp,
      utcTimeUpdated: utcTimestamp,
    };

    await dbUserCreate(this.client, user, hashedPassword);

    const { token, tokenExpiration, refreshToken, refreshTokenExpiration } = createUserToken(
      userId,
      utcTimestamp,
    );

    const authResponse: UserAuthResponse = {
      isAuthenticated: true,
      userId,
      token,
      tokenExpiration,
    };

    res.cookie('refresh_token', refreshToken, { maxAge: refreshTokenExpiration, httpOnly: true });

    return res.status(200).json(authResponse);
  };

  login = async (req: Request, res: Response) => {
    this.logger.logRequest(req);

    const email = isStrictStringOrThrow(req.body.email, 'Email is required');
    const password = isStrictStringOrThrow(req.body.password, 'Password is required');

    const storedCredentials = await dbUserGetFromCredentials(this.client, email);
    if (!storedCredentials) return notFoundException(res, 'A user with this email or password does not exist');

    const { hashedPassword, userId } = storedCredentials;

    const passwordMatches = await promisify(bcrypt.compare)(password, hashedPassword);
    if (!passwordMatches) return badRequestException(res, 'Email and password do not match');

    const user = await dbUserGet(this.client, userId, email);

    if (user) {
      const utcTimestamp = DateTime.now().toMillis();
      const { token, tokenExpiration, refreshToken, refreshTokenExpiration } = createUserToken(
        userId,
        utcTimestamp,
      );

      const authResponse: UserAuthResponse = {
        isAuthenticated: true,
        userId,
        token,
        tokenExpiration,
      };

      res.cookie('refresh_token', refreshToken, { maxAge: refreshTokenExpiration, httpOnly: true });

      return res.status(200).json(authResponse);
    }

    return badRequestException(res, 'Could not login user');
  };

  logout = async (req: Request, res: Response) => {
    this.logger.logRequest(req);

    const authResponse: UserAuthResponse = {
      isAuthenticated: false,
      userId: null,
      token: null,
      tokenExpiration: null,
    };

    return res.status(200).json(authResponse);
  };

  getSelf = async (req: Request, res: Response) => {
    this.logger.logRequest(req);

    const userId = isStrictStringOrThrow(req.body.userId, 'Could not get user ID');

    const user = await dbUserGet(this.client, userId);
    if (!user) return unauthorizedException(res, 'Could not find user');

    // const rightIds = await dbRolesGetRightsByRole(this.client, params.roleId);

    return res.status(200).json({ user: userRemovePII(user) });
  };

  keepAlive = async  (req: Request, res: Response) => {
    this.logger.logRequest(req);

    const userId = isStrictStringOrThrow(req.body.userId, 'Could not get user ID');
    const currentRefreshToken = isStrictStringOrThrow(req.cookies.refresh_token, 'No refresh token');

    verifyUserTokenAndSession(res, currentRefreshToken);

    const utcTimestamp = DateTime.now().toMillis();
    const { token, tokenExpiration, refreshToken, refreshTokenExpiration } = createUserToken(
      userId,
      utcTimestamp,
    );

    const authResponse: UserAuthResponse = {
      isAuthenticated: true,
      userId,
      token,
      tokenExpiration,
    };

    res.cookie('refresh_token', refreshToken, { maxAge: refreshTokenExpiration, httpOnly: true });

    return res.status(200).json(authResponse);
  };
}

export function handler(opts: ServiceHandlerOpts) {
  const { app } = opts;
  const users = new UsersHandler(opts);

  app.post('/api/v1/users/register', handleRequest(users.register));
  app.post('/api/v1/users/login', handleRequest(users.login));
  app.get('/api/v1/users/logout', handleRequest(users.logout));
  app.post('/api/v1/users/self', handleRequest(users.getSelf));
  app.post('/api/v1/users/keepAlive', handleRequest(users.keepAlive));
}

