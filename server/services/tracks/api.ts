import { Request, Response } from 'express';
import { DateTime } from 'luxon';
import { ServiceHandlerOpts, DBClient } from '../../serverTypes';
import Logger from '../../../common/helpers/Logger';
import { handleRequest } from '../../api/apiUtils';
import { forbiddenException } from '../../api/apiExceptions';
import { createGuid } from '../../../common/utils/baseUtils';
import { trackStateReducer } from '../../../common/utils/trackStateUtils';
import { validateTrackUpsertParams } from './utils';
import {
  dbCreateTrack,
  dbGetTracksForTeam,
  dbGetTrackForTeam,
  dbUpdateTrack,
  dbTrackExistsForTeam,
  dbGetTrackReduction,
} from './db';
import { dbGetTeamForUser } from '../teams/db';
import { dbUserInTeam } from '../users/db';
import { canCreateOrThrow, canReadOrThrow, canUpdateOrThrow } from '../roles/utils';
import { EntityTrack, TrackState, TrackActionStart } from '../../../common/types/entityTypes';


class TracksHandler {
  client: DBClient;
  logger: Logger;

  constructor(opts: ServiceHandlerOpts) {
    const { client, logger } = opts;
    this.client = client;
    this.logger = logger;
  }

  getTracks = async (req: Request, res: Response) => {
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

    const track = await dbGetTracksForTeam(this.client, teamId);

    return res.status(200).json(track);
  };

  createTrack = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    await canCreateOrThrow(res, this.client, userId);

    const teamId = req.params.teamId;
    const userInTeam = await dbUserInTeam(this.client, userId, teamId);
    if (!userInTeam) {
      return forbiddenException(res, `User '${userId}' is not in this team '${teamId}'`);
    }

    const trackId = createGuid('track');
    const params = validateTrackUpsertParams(req.body);
    const utcTimestamp = DateTime.now().toMillis();

    const track: EntityTrack = {
      ...params,
      trackId,
      utcTimeCreated: utcTimestamp,
      utcTimeUpdated: utcTimestamp,
    };

    const trackActionId = createGuid('trackAction');

    const trackAction: null | TrackActionStart =
      params.config.type === 'TEMPLATE'
        ? {
          type: 'START',
          payload: {
            startDate: params.startDate,
            template: params.config.template,
            version: params.config.version,
          },
        }
        : null;

    const trackState: null | TrackState = trackAction ? trackStateReducer(trackAction) : null;

    await dbCreateTrack(this.client, userId, track, trackActionId, trackAction, trackState);

    return res.status(200).json(track);
  };

  getTrack = async (req: Request, res: Response) => {
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

    const trackId = req.params.trackId;
    const track = await dbGetTrackForTeam(this.client, teamId, trackId);

    return res.status(200).json(track);
  };

  updateTrack = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    await canUpdateOrThrow(res, this.client, userId);

    const teamId = req.params.teamId;
    const trackId = req.params.trackId;
    const trackExists = await dbTrackExistsForTeam(this.client, teamId, trackId);
    if (!trackExists) {
      return forbiddenException(res, `Track '${trackId}' does not exist for this team '${teamId}'`);
    }

    const params = validateTrackUpsertParams(req.body);
    const utcTimestamp = DateTime.now().toMillis();

    const track: undefined | EntityTrack = await dbUpdateTrack(
      this.client,
      trackId,
      params,
      utcTimestamp,
    );

    if (!track) {
      throw new Error(`Could not update track: "${trackId}"`);
    }

    return res.status(200).json(track);
  };

  getTrackReduction = async (req: Request, res: Response) => {
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

    const trackId = req.params.trackId;
    const reduction = await dbGetTrackReduction(this.client, trackId);

    return res.status(200).json(reduction);
  }
}

export function handler(opts: ServiceHandlerOpts) {
  const { app } = opts;
  const tracks = new TracksHandler(opts);

  app.post('/api/v1/users/:userId/teams/:teamId/tracks/', handleRequest(tracks.getTracks, opts));
  app.post('/api/v1/users/:userId/teams/:teamId/tracks/create', handleRequest(tracks.createTrack, opts));
  app.post('/api/v1/users/:userId/teams/:teamId/tracks/:trackId', handleRequest(tracks.getTrack, opts));
  app.put('/api/v1/users/:userId/teams/:teamId/tracks/:trackId', handleRequest(tracks.updateTrack, opts));
  app.post('/api/v1/users/:userId/teams/:teamId/tracks/:trackId/reduction', handleRequest(tracks.getTrackReduction, opts));
}
