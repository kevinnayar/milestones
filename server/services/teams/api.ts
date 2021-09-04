import { Request, Response } from 'express';
import { DateTime } from 'luxon';
import Logger from '../../../shared/helpers/Logger';
import { handleRequest, forbiddenException } from '../../api/apiUtils';
import { validTeamCreateParams } from './utils';
import { createGuid } from '../../../shared/utils/baseUtils';
import { dbTeamCreate } from './db';
import { dbUserCan } from '../roles/db';
import { ServiceHandlerOpts, DBClient } from '../../types';
import { EntityTeam } from '../../../shared/types/entityTypes';

class TeamsHandler {
  client: DBClient;
  logger: Logger;

  constructor(opts: ServiceHandlerOpts) {
    const { client, logger } = opts;
    this.client = client;
    this.logger = logger;
  }

  createTeam = async (req: Request, res: Response) => {
    this.logger.logRequest(req);

    const userId = req.params.userId;
    const canCreate = await dbUserCan(this.client, 'create', userId);
    if (!canCreate) {
      return forbiddenException(res, `User: ${userId} does not have permissions to create a team`);
    }

    const teamId = createGuid('team');
    const params = validTeamCreateParams(req.body);
    const utcTimestamp = DateTime.now().toMillis();

    const team: EntityTeam = {
      ...params,
      teamId,
      trackIds: [],
      utcTimeCreated: utcTimestamp,
      utcTimeUpdated: utcTimestamp,
    };

    await dbTeamCreate(this.client, userId, team);

    return res.status(200).json({ team });
  };
}

export function handler(opts: ServiceHandlerOpts) {
  const { app } = opts;
  const team = new TeamsHandler(opts);

  app.post('/api/v1/users/:userId/teams/create', handleRequest(team.createTeam));
}
