import {
  EntityTrack,
  TrackActionStart,
  TrackUpsertParams,
  TrackAction,
  TrackState,
  TrackReduction,
} from '../../../common/types/entityTypes';
import { DBClient } from '../../serverTypes';
import { convertRowToTrack } from './utils';

export async function dbCreateTrack(
  client: DBClient,
  userId: string,
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
        user_id,
        action_type,
        action,
        state,
        utc_time_created
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ;
    `;
    const trackActionValues = [
      trackActionId,
      track.trackId,
      userId,
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

export async function dbUpdateTrack(client: DBClient, trackId: string, params: TrackUpsertParams,
  utcTimestamp: number) {
  const query = `
    UPDATE tracks 
    SET
      name = $1,
      description = $2,
      utc_time_updated = $3
    WHERE id = $4
    RETURNING *
    ;
  `;
  const values = [params.name, params.description, utcTimestamp, trackId];
  const rows = await client.query(query, values);
  const track = rows && rows.length ? convertRowToTrack(rows[0]) : undefined;
  return track;
}

export async function dbGetTracksForTeam(client: DBClient, teamId: string) {
  const query = `
    SELECT * FROM tracks
      WHERE team_id = $1 
    ;
  `;
  const values = [teamId];

  const rows = await client.query(query, values);
  const tracks = rows && rows.length ? rows.map(convertRowToTrack) : null;
  return tracks;
}

export async function dbGetTrackForTeam(client: DBClient, teamId: string, trackId: string) {
  const query = `
    SELECT * FROM tracks
      WHERE id = $1 
      AND team_id = $2
    ;
  `;
  const values = [trackId, teamId];

  const rows = await client.query(query, values);
  const track = rows && rows.length ? convertRowToTrack(rows[0]) : null;
  return track;
}

export async function dbTrackExistsForTeam(client: DBClient, teamId: string, trackId: string) {
  const query = 'SELECT EXISTS (SELECT TRUE FROM tracks WHERE id = $1 AND team_id = $2)';
  const values = [trackId, teamId];
  const rows = await client.query(query, values);
  const exists = rows && rows.length ? rows[0].exists : false;
  return exists;
}

export async function dbGetTrackReduction(client: DBClient, trackId: string): Promise<void | TrackReduction> {
  const actionsRows = await client.query(
    'SELECT action FROM track_actions WHERE track_id = $1 ORDER BY utc_time_created ASC;',
    [trackId],
  );

  const actions: void | TrackAction[] = actionsRows && actionsRows.length ? actionsRows.map(a => a.action) : undefined;
  if (!actions) return undefined;

  const stateRows = await client.query(
    'SELECT state FROM track_actions WHERE track_id = $1 ORDER BY utc_time_created DESC LIMIT 1;',
    [trackId],
  );

  const state: void | TrackState = stateRows && stateRows.length ? stateRows[0].state : undefined;
  if (!state) return undefined;

  return {
    actions,
    state,
  };
}



