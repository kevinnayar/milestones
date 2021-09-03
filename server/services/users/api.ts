import { Request, Response } from 'express';
import { DateTime } from 'luxon';
import { Logger, logReq } from '../../../shared/helpers/logger';
import { handleRequest } from '../../api/apiUtils';
import { badRequestException } from '../../api/apiExceptions';
import { createGuid } from '../../../shared/utils/baseUtils';
import {
  isStrictStringOrThrow,
  isStrictStringNullVoidOrThrow,
  inStringUnionOrThrow,
  isValidEmailOrThrow,
} from '../../../shared/utils/typeUtils';
import { dbUserCreate, dbUserEmailExists } from './db';
import { dbTeamExists } from '../teams/db';
import { ServiceHandlerOpts, DBClient } from '../../types';
import { Maybe } from '../../../shared/types/baseTypes';
import { EntityUser, RoleType } from '../../../shared/types/entityTypes';

class UsersHandler {
  client: DBClient;
  log: Logger;

  constructor(opts: ServiceHandlerOpts) {
    const { client, log } = opts;
    this.client = client;
    this.log = log;
  }

  createUser = async (req: Request, res: Response) => {
    this.log.info(logReq(req));

    const email = isValidEmailOrThrow(req.body.email, 'A valid email is required');
    const emailExists = await dbUserEmailExists(this.client, email);
    if (emailExists) {
      return badRequestException(res, `A user with email '${email}' already exists`);
    }

    const teamId: Maybe<string> = isStrictStringNullVoidOrThrow(req.body.teamId, 'A valid team is required');
    const allowedRoles: RoleType[] = ['role_owner', 'role_editor', 'role_viewer'];
    const roleId: RoleType = inStringUnionOrThrow(req.body.roleId, allowedRoles, 'A valid role is required');

    if (roleId === 'role_owner' && teamId) {
      return badRequestException(res, 'Cannot create user as owner of an existing team');
    }

    if (roleId === 'role_viewer' || roleId === 'role_editor') {
      if (!teamId) {
        return badRequestException(res, 'Cannot create user as viewer/editor without an existing team');
      }

      const teamExists = await dbTeamExists(this.client, teamId);
      if (!teamExists) {
        return badRequestException(res, `Cannot created user as viewer/editor because team: '${teamId}' doesn't exist`);
      }
    }

    const userId = createGuid('user');
    const displayName = isStrictStringOrThrow(req.body.displayName, 'Display name is required');
    const firstName = isStrictStringOrThrow(req.body.firstName, 'First name is required');
    const lastName = isStrictStringOrThrow(req.body.lastName, 'Last name is required');
    const utcTimestamp = DateTime.now().toMillis();

    const user: EntityUser = {
      userId,
      roleId,
      displayName,
      firstName,
      lastName,
      email,
      utcTimeCreated: utcTimestamp,
      utcTimeUpdated: utcTimestamp,
    };

    await dbUserCreate(this.client, user);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const { roleId: _r, firstName: _f, lastName: _l, email: _e, ...userNoPII } = user;

    return res.status(200).json({ user: userNoPII });
  };
}

export function handler(opts: ServiceHandlerOpts) {
  const { app } = opts;
  const users = new UsersHandler(opts);

  app.post('/api/v1/users/create', handleRequest(users.createUser));
}
