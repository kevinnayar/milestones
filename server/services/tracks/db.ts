import { EntityTrack } from 'shared/types/entityTypes';
import { DBClient } from '../../types';

export async function dbTrackCreate(
  client: DBClient,
  teamId: string,
  track: EntityTrack,
  trackState: any,
): Promise<string> {
  const trackQuery = `
    INSERT INTO tracks (
      id,
      type,
      template,
      version,
      name,
      description,
      start_date,
      utc_time_created
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    ;
  `;
  const trackValues = [
    track.trackId,
    track.trackType,
    track.trackTemplate,
    track.trackVersion,
    track.name,
    track.description,
    track.startDate,
    track.utcTimeCreated,
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

  const trackStateQuery = `
    INSERT INTO track_state (
      track_id,
      milestone_id,
      action,
      state,
      utc_time_created
    )
    VALUES ($1, $2, $3, $4, $5)
    ;
  `;
  const trackStateValues = [track.trackId, '__INIT__', 'CREATE', trackState, track.utcTimeCreated];

  await client.tx(async (t) => {
    await t.query(trackQuery, trackValues);
    await t.query(trackStateQuery, trackStateValues);
    await t.query(teamQuery, teamValues);
  });

  return track.trackId;
}
