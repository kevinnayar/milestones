import { Request, Response } from 'express';
import { DateTime } from 'luxon';
import { ServiceHandlerOpts, DBClient } from '../../types';
import { Logger, logReq } from '../../../shared/helpers/logger';
import { handleRequest } from '../../api/apiUtils';
import { createGuid } from '../../../shared/utils/baseUtils';
import { isStringOrThrow, isSimpleDateOrThrow } from '../../../shared/utils/typeUtils';

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

    const name = isStringOrThrow(req.body.name, 'A name is required');
    const startDate = isSimpleDateOrThrow(req.body.startDate, 'A valid start date is required');
    const guid = createGuid('track');
    const utcTimeCreated = DateTime.now().toMillis();

    const track = {
      name,
      startDate,
      guid,
      utcTimeCreated,
    };

    return res.status(200).json({ track });
  };
}

export function handler(opts: ServiceHandlerOpts) {
  const { app } = opts;
  const tracks = new TracksHandler(opts);

  app.post('/api/v1/tracks/create', handleRequest(tracks.createTrack));
}
