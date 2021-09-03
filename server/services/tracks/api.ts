import { Request, Response } from 'express';
import { DateTime } from 'luxon';
import { ServiceHandlerOpts, DBClient } from '../../types';
import Logger from '../../../shared/helpers/Logger';
import { handleRequest } from '../../api/apiUtils';
import { createGuid } from '../../../shared/utils/baseUtils';
import { forbiddenException } from '../../api/apiExceptions';
import { getInitTrackState, validateTrackCreateParams } from './utils';
import { dbTrackCreate } from './db';
import { dbUserInTeam } from '../users/db';
import { dbUserCan } from '../roles/db';
import { EntityTrack } from '../../../shared/types/entityTypes';

class TracksHandler {
  client: DBClient;
  logger: Logger;

  constructor(opts: ServiceHandlerOpts) {
    const { client, logger } = opts;
    this.client = client;
    this.logger = logger;
  }

  createTrack = async (req: Request, res: Response) => {
    this.logger.logRequest(req);

    const userId = req.params.userId;
    const userCanCreate = dbUserCan(this.client, 'create', userId);
    if (!userCanCreate) return forbiddenException(res);

    const teamId = req.params.teamId;
    const userInTeam = await dbUserInTeam(this.client, userId, teamId);
    if (!userInTeam) return forbiddenException(res, `User '${userId}' is not in this team '${teamId}'`);

    const trackId = createGuid('track');
    const params = validateTrackCreateParams(req.body);
    const utcTimestamp = DateTime.now().toMillis();

    const trackState = params.config.type === 'TEMPLATE'
      ? getInitTrackState(params.config.template, params.config.version)
      : {};

    const track: EntityTrack = {
      ...params,
      trackId,
      utcTimeCreated: utcTimestamp,
      utcTimeUpdated: utcTimestamp,
    };

    await dbTrackCreate(this.client, teamId, track, trackState);

    return res.status(200).json({ track });
  };
}

export function handler(opts: ServiceHandlerOpts) {
  const { app } = opts;
  const tracks = new TracksHandler(opts);

  app.post('/api/v1/users/:userId/teams/:teamId/tracks/create', handleRequest(tracks.createTrack));
}
