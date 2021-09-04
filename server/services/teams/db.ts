import { EntityTeam } from 'shared/types/entityTypes';
import { DBClient } from '../../types';

export async function dbTeamExists(client: DBClient, teamId: string): Promise<boolean> {
  const query = 'SELECT EXISTS (SELECT TRUE FROM teams WHERE id = $1)';
  const values = [teamId];
  const rows = await client.query(query, values);
  const exists = rows && rows.length ? rows[0].exists : false;
  return exists;
}

export async function dbTeamCreate(client: DBClient, userId: string, team: EntityTeam): Promise<string> {
  const userQuery = `
    UPDATE users 
      SET
        team_id = $1,
        utc_time_updated = $2
      WHERE id = $3
    ;
  `;
  const userValues = [team.teamId, team.utcTimeCreated, userId];

  const teamQuery = `
    INSERT INTO teams (
      id,
      track_ids,
      name,
      description,
      utc_time_created,
      utc_time_updated
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    ;
  `;
  const teamValues = [
    team.teamId,
    team.trackIds,
    team.name,
    team.description,
    team.utcTimeCreated,
    team.utcTimeUpdated,
  ];

  await client.tx(async t => {
    await t.query(userQuery, userValues);
    await t.query(teamQuery, teamValues);
  });

  return team.teamId;
}

