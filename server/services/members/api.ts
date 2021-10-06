import { Request, Response } from 'express';
import { ServiceHandlerOpts, DBClient } from '../../serverTypes';
import Logger from '../../../common/helpers/Logger';
import { handleRequest } from '../../api/apiUtils';
import { forbiddenException } from '../../api/apiExceptions';
import { dbGetTeamMembers } from './db';
import { dbGetTeamForUser } from '../teams/db';
import { canReadOrThrow } from '../roles/utils';

class MembersHandler {
  client: DBClient;
  logger: Logger;

  constructor(opts: ServiceHandlerOpts) {
    const { client, logger } = opts;
    this.client = client;
    this.logger = logger;
  }

  getTeamMembers = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    await canReadOrThrow(res, this.client, userId);

    const teamId = req.params.teamId;
    const team = await dbGetTeamForUser(this.client, userId, teamId);
    if (!team) {
      return forbiddenException(
        res,
        `User '${userId}' is does not have access to team '${teamId}'`,
      );
    }

    const members = await dbGetTeamMembers(this.client, teamId);

    return res.status(200).json(members);
  };
}

export function handler(opts: ServiceHandlerOpts) {
  const { app } = opts;
  const members = new MembersHandler(opts);

  app.post('/api/v1/users/:userId/teams/:teamId/members', handleRequest(members.getTeamMembers, opts));
}
