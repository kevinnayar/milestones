import { EntityTrack, TrackState, TrackActionStart } from '../../../common/types/entityTypes';
import { DBClient } from '../../serverTypes';

export async function dbTrackCreate(
  client: DBClient,
  track: EntityTrack,
  trackActionId: string,
  trackAction: null | TrackActionStart,
  trackState: null | TrackState,
): Promise<string> {
  const trackTemplate = track.config.type === 'TEMPLATE' ? track.config.template : null;
  const trackVersion = track.config.type === 'TEMPLATE' ? track.config.version : null;
  const trackQuery = `
    INSERT INTO tracks (
      id,
      team_id,
      type,
      template,
      version,
      name,
      description,
      start_date,
      utc_time_created,
      utc_time_updated
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    ;
  `;
  const trackValues = [
    track.trackId,
    track.teamId,
    track.config.type,
    trackTemplate,
    trackVersion,
    track.name,
    track.description,
    track.startDate,
    track.utcTimeCreated,
    track.utcTimeUpdated,
  ];

  const queryTuples: Array<[string, any[]]> = [[trackQuery, trackValues]];

  if (trackAction && trackState) {
    const trackActionQuery = `
      INSERT INTO track_actions (
        id,
        track_id,
        action_type,
        action,
        state,
        utc_time_created
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      ;
    `;
    const trackActionValues = [
      trackActionId,
      track.trackId,
      trackAction.type,
      trackAction.payload,
      trackState,
      track.utcTimeCreated,
    ];

    queryTuples.push([trackActionQuery, trackActionValues]);
  }

  await client.tx(async (t) => {
    for (const tuple of queryTuples) {
      await t.query(tuple[0], tuple[1]);
    }
  });

  return track.trackId;
}

export async function dbTrackGetByTeam(client: DBClient, teamId: string, trackId: string) {
  const query = `
    SELECT * FROM tracks
      WHERE id = $1 
      AND team_id = $2
    ;
  `;
  const values = [trackId, teamId];

  const rows = await client.query(query, values);
  // const teams = rows && rows.length ? convertRowToTeam(rows[0]) : null;
  // return teams;
  return rows;
}
