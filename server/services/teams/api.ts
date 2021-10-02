import { Request, Response } from 'express';
import { DateTime } from 'luxon';
import Logger from '../../../common/helpers/Logger';
import { handleRequest } from '../../api/apiUtils';
import { validTeamUpsertParams } from './utils';
import { createGuid } from '../../../common/utils/baseUtils';
import { dbCreateTeam, dbGetTeamsForUser, dbGetTeamForUser, dbUpdateTeam } from './db';
import { canCreateOrThrow, canReadOrThrow, canUpdateOrThrow } from '../roles/utils';
import { ServiceHandlerOpts, DBClient } from '../../serverTypes';
import { EntityTeam } from '../../../common/types/entityTypes';

class TeamsHandler {
  client: DBClient;
  logger: Logger;

  constructor(opts: ServiceHandlerOpts) {
    const { client, logger } = opts;
    this.client = client;
    this.logger = logger;
  }

  createTeam = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    await canCreateOrThrow(res, this.client, userId);

    const teamId = createGuid('team');
    const params = validTeamUpsertParams(req.body);
    const utcTimestamp = DateTime.now().toMillis();

    const team: EntityTeam = {
      ...params,
      teamId,
      utcTimeCreated: utcTimestamp,
      utcTimeUpdated: utcTimestamp,
    };

    await dbCreateTeam(this.client, userId, team);

    return res.status(200).json(team);
  };

  getTeams = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    await canReadOrThrow(res, this.client, userId);

    const teams = await dbGetTeamsForUser(this.client, userId);

    return res.status(200).json(teams);
  };

  getTeam = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    await canReadOrThrow(res, this.client, userId);
    const teamId = req.params.teamId;

    const team = await dbGetTeamForUser(this.client, userId, teamId);

    return res.status(200).json(team);
  };

  updateTeam = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    await canUpdateOrThrow(res, this.client, userId);

    const teamId = req.params.teamId;
    const params = validTeamUpsertParams(req.body);
    const utcTimestamp = DateTime.now().toMillis();

    const team: undefined | EntityTeam = await dbUpdateTeam(this.client, teamId, params, utcTimestamp);

    if (!team) {
      throw new Error(`Could not update team: "${teamId}"`);
    }

    return res.status(200).json(team);
  };
}

export function handler(opts: ServiceHandlerOpts) {
  const { app } = opts;
  const team = new TeamsHandler(opts);

  app.post('/api/v1/users/:userId/teams', handleRequest(team.getTeams, opts));
  app.post('/api/v1/users/:userId/teams/create', handleRequest(team.createTeam, opts));
  app.post('/api/v1/users/:userId/teams/:teamId', handleRequest(team.getTeam, opts));
  app.put('/api/v1/users/:userId/teams/:teamId', handleRequest(team.updateTeam, opts));
}
