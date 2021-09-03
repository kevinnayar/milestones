import { Request, Response } from 'express';
import { DateTime } from 'luxon';
import { ServiceHandlerOpts, DBClient } from '../../types';
import { Logger, logReq } from '../../../shared/helpers/logger';
import { handleRequest } from '../../api/apiUtils';
import { createGuid } from '../../../shared/utils/baseUtils';
import { getInitTrackState } from './utils';
import { dbTrackCreate } from './db';
import {
  isStrictStringOrThrow,
  inStringUnionOrThrow,
  isStrictStringNullVoidOrThrow,
  isAbsoluteDateOrThrow,
  isNumberOrThrow,
} from '../../../shared/utils/typeUtils';
import { EntityTrack, TrackType, TrackTemplate } from '../../../shared/types/entityTypes';
import { Maybe } from '../../../shared/types/baseTypes';

class TracksHandler {
  client: DBClient;
  log: Logger;

  constructor(opts: ServiceHandlerOpts) {
    const { client, log } = opts;
    this.client = client;
    this.log = log;
  }

  createTrack = async (req: Request, res: Response) => {
    this.log.info(logReq(req));

    // user id
    // team id
    // is user in team, can create?

    const teamId = isStrictStringOrThrow(req.body.teamId, 'A team is required');
    const trackId = createGuid('track');
    const allowedTracks: TrackType[] = ['CUSTOM', 'TEMPLATE'];
    const trackType: TrackType = inStringUnionOrThrow(req.body.trackType, allowedTracks, 'A valid track type is required');

    let trackState = {};
    let trackVersion: void | number;
    let trackTemplate: void | TrackTemplate;

    if (trackType === 'TEMPLATE') {
      trackVersion = isNumberOrThrow(req.body.trackVersion, 'Track version is invalid');

      const allowedTemplates: TrackTemplate[] = ['CHILD_MILESTONES', 'PET_MILESTONES'];
      trackTemplate = inStringUnionOrThrow(req.body.trackTemplate, allowedTemplates, 'A valid track template is required');

      trackState = getInitTrackState(trackTemplate, trackVersion);
    }


    const name = isStrictStringOrThrow(req.body.name, 'A name is required');
    const description: Maybe<string> = isStrictStringNullVoidOrThrow(req.body.description, 'A valid team is required');
    const startDate = isAbsoluteDateOrThrow(req.body.startDate, 'A valid start date is required');
    const utcTimeCreated = DateTime.now().toMillis();

    const track: EntityTrack = {
      trackId,
      trackType,
      trackTemplate,
      trackVersion,
      name,
      description,
      startDate,
      utcTimeCreated,
    };

    await dbTrackCreate(this.client, teamId, track, trackState);

    return res.status(200).json({ track });
  };
}

export function handler(opts: ServiceHandlerOpts) {
  const { app } = opts;
  const tracks = new TracksHandler(opts);

  app.post('/api/v1/tracks/create', handleRequest(tracks.createTrack));
}
