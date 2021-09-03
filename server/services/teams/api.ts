import { Request, Response } from 'express';
import { DateTime } from 'luxon';
import { Logger, logReq } from '../../../shared/helpers/logger';
import { handleRequest } from '../../api/apiUtils';
import { badRequestException } from '../../api/apiExceptions';
import { createGuid } from '../../../shared/utils/baseUtils';
import {
  isStrictStringOrThrow,
  isStrictStringNullVoidOrThrow,
} from '../../../shared/utils/typeUtils';
import { dbTeamCreate } from './db';
import { dbUserExistsAndIsOwner } from '../users/db';
import { ServiceHandlerOpts, DBClient } from '../../types';
import { EntityTeam } from '../../../shared/types/entityTypes';

class TeamsHandler {
  client: DBClient;
  log: Logger;

  constructor(opts: ServiceHandlerOpts) {
    const { client, log } = opts;
    this.client = client;
    this.log = log;
  }

  createTeam = async (req: Request, res: Response) => {
    this.log.info(logReq(req));

    const userId = req.params.userId;
    const userIsOwner = await dbUserExistsAndIsOwner(this.client, userId);
    if (!userIsOwner) {
      return badRequestException(res, `User: ${userId} does not have permissions to create a team`);
    }

    const teamId = createGuid('team');
    const trackIds = [];
    const name = isStrictStringOrThrow(req.body.name, 'Team name is required');
    const description = isStrictStringNullVoidOrThrow(req.body.description, 'Description is invalid');
    const utcTimestamp = DateTime.now().toMillis();

    const team: EntityTeam = {
      teamId,
      trackIds,
      name,
      description,
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
