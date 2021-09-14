import { Request, Response } from 'express';
import { DateTime } from 'luxon';
import Logger from '../../../shared/helpers/Logger';
import { handleRequest } from '../../api/apiUtils';
import { forbiddenException } from '../../api/apiExceptions';
import { validTeamCreateParams } from './utils';
import { createGuid } from '../../../shared/utils/baseUtils';
import { dbTeamCreate, dbTeamGetByUser } from './db';
import { dbRolesUserCan } from '../roles/db';
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
    const canCreate = await dbRolesUserCan(this.client, 'right_create', userId);
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

  getTeamByUser = async (req: Request, res: Response) => {
    this.logger.logRequest(req);

    const userId = req.params.userId;
    const can = await dbRolesUserCan(this.client, 'right_read', userId);
    if (!can) {
      return forbiddenException(res, `User: ${userId} does not have permissions to see a team`);
    }

    const teamMaybe = await dbTeamGetByUser(this.client, userId);

    return res.status(200).json({ team: teamMaybe });
  };
}

export function handler(opts: ServiceHandlerOpts) {
  const { app } = opts;
  const team = new TeamsHandler(opts);

  app.post('/api/v1/users/:userId/teams', handleRequest(team.getTeamByUser));
  app.post('/api/v1/users/:userId/teams/create', handleRequest(team.createTeam));
}
