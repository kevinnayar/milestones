import { Request, Response } from 'express';
import { DateTime } from 'luxon';
import { ServiceHandlerOpts, DBClient } from '../../serverTypes';
import Logger from '../../../shared/helpers/Logger';
import { handleRequest } from '../../api/apiUtils';
import { forbiddenException, badRequestException } from '../../api/apiExceptions';
import { createGuid } from '../../../shared/utils/baseUtils';
import { trackStateReducer } from '../../../shared/utils/trackStateUtils';
import { validateTrackCreateParams } from './utils';
import { dbTrackCreate, dbTrackGetByTeam } from './db';
import { dbGetTeamForUser } from '../teams/db';
import { dbUserInTeam } from '../users/db';
import { canCreateOrThrow, canReadOrThrow } from '../roles/utils';
import { EntityTrack, TrackState, TrackActionStart } from '../../../shared/types/entityTypes';


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
    await canCreateOrThrow(res, this.client, userId);

    const teamId = req.params.teamId;
    const userInTeam = await dbUserInTeam(this.client, userId, teamId);
    if (!userInTeam) {
      return forbiddenException(res, `User '${userId}' is not in this team '${teamId}'`);
    }

    const trackId = createGuid('track');
    const params = validateTrackCreateParams(req.body);
    const utcTimestamp = DateTime.now().toMillis();

    if (params.config.type === 'CUSTOM') {
      return badRequestException(res, "A track type of 'CUSTOM' is not supported");
    }

    const track: EntityTrack = {
      ...params,
      trackId,
      utcTimeCreated: utcTimestamp,
      utcTimeUpdated: utcTimestamp,
    };

    const trackActionId = createGuid('trackAction');

    const trackAction: TrackActionStart = {
      type: 'START',
      payload: {
        startDate: params.startDate,
        template: params.config.template,
        version: params.config.version,
      },
    };

    const trackState: TrackState = trackStateReducer(trackAction);

    await dbTrackCreate(this.client, teamId, track, trackActionId, trackAction, trackState);

    return res.status(200).json({ track });
  };

  getTrack = async (req: Request, res: Response) => {
    this.logger.logRequest(req);

    const userId = req.params.userId;
    await canReadOrThrow(res, this.client, userId);

    const teamId = req.params.teamId;
    const team = await dbGetTeamForUser(this.client, userId, teamId);
    if (!team) {
      return forbiddenException(res, `User '${userId}' is does not have access to team '${teamId}'`);
    }

    const trackId = req.params.trackId;
    await canReadOrThrow(res, this.client, trackId);

    const track = await dbTrackGetByTeam(this.client, teamId, trackId);

    return res.status(200).json(track);
  };
}

export function handler(opts: ServiceHandlerOpts) {
  const { app } = opts;
  const tracks = new TracksHandler(opts);

  app.post('/api/v1/users/:userId/teams/:teamId/tracks/create', handleRequest(tracks.createTrack));
  app.post('/api/v1/users/:userId/teams/:teamId/tracks/:trackId', handleRequest(tracks.getTrack));
}
