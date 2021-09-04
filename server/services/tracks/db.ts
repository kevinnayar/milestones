import { EntityTrack, TrackState, TrackActionStart } from '../../../shared/types/entityTypes';
import { DBClient } from '../../types';

export async function dbTrackCreate(
  client: DBClient,
  teamId: string,
  track: EntityTrack,
  trackActionId: string,
  trackAction: TrackActionStart,
  trackState: TrackState,
): Promise<string> {
  const trackActionQuery = `
    INSERT INTO track_actions (
      id,
      track_id,
      action,
      state,
      utc_time_created
    )
    VALUES ($1, $2, $3, $4, $5)
    ;
  `;
  const trackActionValues = [trackActionId, track.trackId, trackAction, trackState, track.utcTimeCreated];

  const trackTemplate = track.config.type === 'TEMPLATE' ? track.config.template : null;
  const trackVersion = track.config.type === 'TEMPLATE' ? track.config.version : null;
  const trackQuery = `
    INSERT INTO tracks (
      id,
      type,
      template,
      version,
      name,
      description,
      utc_time_created,
      utc_time_updated
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    ;
  `;
  const trackValues = [
    track.trackId,
    track.config.type,
    trackTemplate,
    trackVersion,
    track.name,
    track.description,
    track.utcTimeCreated,
    track.utcTimeUpdated,
  ];

  const teamQuery = `
    UPDATE teams
      SET
        track_ids = array_append(track_ids, $1),
        utc_time_updated = $2
      WHERE id = $3
    ;
  `;
  const teamValues = [track.trackId, track.utcTimeCreated, teamId];

  await client.tx(async (t) => {
    await t.query(trackQuery, trackValues);
    await t.query(trackActionQuery, trackActionValues);
    await t.query(teamQuery, teamValues);
  });

  return track.trackId;
}
