import { convertRowToTeam } from './utils';
import { EntityTeam } from '../../../shared/types/entityTypes';
import { DBClient } from '../../serverTypes';

export async function dbTeamExists(client: DBClient, teamId: string): Promise<boolean> {
  const query = 'SELECT EXISTS (SELECT TRUE FROM teams WHERE id = $1)';
  const values = [teamId];
  const rows = await client.query(query, values);
  const exists = rows && rows.length ? rows[0].exists : false;
  return exists;
}

export async function dbCreateTeam(client: DBClient, userId: string, team: EntityTeam): Promise<string> {
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

export async function dbGetTeamsForUser(client: DBClient, userId: string): Promise<EntityTeam[]> {
  const query = `
    SELECT teams.* FROM teams
      JOIN users_teams_junction ON users_teams_junction.team_id = teams.id
      AND users_teams_junction.user_id = $1
    ;
  `;
  const values = [userId];

  const rows = await client.query(query, values);
  const teams = rows && rows.length ? rows.map(convertRowToTeam) : [];
  return teams;
}

export async function dbGetTeamForUser(client: DBClient, userId: string, teamId: string): Promise<undefined | EntityTeam> {
  const query = `
    SELECT teams.* FROM teams
      JOIN users_teams_junction ON users_teams_junction.team_id = teams.id
      AND users_teams_junction.user_id = $1
      AND users_teams_junction.team_id = $2
    ;
  `;
  const values = [userId, teamId];

  const rows = await client.query(query, values);
  const team = rows && rows.length ? convertRowToTeam(rows[0]) : undefined;
  return team;
}

