import { Request, Response } from 'express';
import { DateTime } from 'luxon';
import Logger from '../../../shared/helpers/Logger';
import { handleRequest } from '../../api/apiUtils';
import { forbiddenException } from '../../api/apiExceptions';
import { validTeamCreateParams } from './utils';
import { createGuid } from '../../../shared/utils/baseUtils';
import { dbTeamCreate, dbTeamGetByUser } from './db';
import { canCreateOrThrow, canReadOrThrow } from '../roles/utils';
import { ServiceHandlerOpts, DBClient } from '../../serverTypes';
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
    await canCreateOrThrow(res, this.client, userId);

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

  getUserTeam = async (req: Request, res: Response) => {
    this.logger.logRequest(req);

    const userId = req.params.userId;
    await canReadOrThrow(res, this.client, userId);

    const team = await dbTeamGetByUser(this.client, userId);

    return res.status(200).json(team);
  };
}

export function handler(opts: ServiceHandlerOpts) {
  const { app } = opts;
  const team = new TeamsHandler(opts);

  app.post('/api/v1/users/:userId/teams', handleRequest(team.getUserTeam));
  app.post('/api/v1/users/:userId/teams/create', handleRequest(team.createTeam));
}
