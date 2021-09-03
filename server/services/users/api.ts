import { Request, Response } from 'express';
import { DateTime } from 'luxon';
import Logger from '../../../shared/helpers/Logger';
import { handleRequest } from '../../api/apiUtils';
import { badRequestException } from '../../api/apiExceptions';
import { createGuid, formatError } from '../../../shared/utils/baseUtils';
import { validUserCreateParams, userRemovePII } from './utils';
import { dbUserCreate, dbUserEmailExists } from './db';
import { dbTeamExists } from '../teams/db';
import { ServiceHandlerOpts, DBClient } from '../../types';
import { EntityUser, UserCreateParams } from '../../../shared/types/entityTypes';

class UsersHandler {
  client: DBClient;
  logger: Logger;

  constructor(opts: ServiceHandlerOpts) {
    const { client, logger } = opts;
    this.client = client;
    this.logger = logger;
  }

  createUser = async (req: Request, res: Response) => {
    this.logger.logRequest(req);

    try {
      const userId = createGuid('user');
      const params: UserCreateParams = validUserCreateParams(req.body);
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
          return badRequestException(res, `Cannot created user as viewer/editor because team: '${params.teamId}' doesn't exist`);
        }
      }

      const user: EntityUser = {
        ...params,
        userId,
        utcTimeCreated: utcTimestamp,
        utcTimeUpdated: utcTimestamp,
      };

      await dbUserCreate(this.client, user);

      const userNoPII = userRemovePII(user);

      return res.status(200).json({ user: userNoPII });
    } catch (e) {
      return badRequestException(res, formatError(e));
    }
  };
}

export function handler(opts: ServiceHandlerOpts) {
  const { app } = opts;
  const users = new UsersHandler(opts);

  app.post('/api/v1/users/create', handleRequest(users.createUser));
}
