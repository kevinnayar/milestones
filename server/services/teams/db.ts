import { convertRowToTeam } from './utils';
import { EntityTeam, TeamUpsertParams } from '../../../common/types/entityTypes';
import { DBClient } from '../../serverTypes';

export async function dbTeamExists(client: DBClient, teamId: string): Promise<boolean> {
  const query = 'SELECT EXISTS (SELECT TRUE FROM teams WHERE id = $1)';
  const values = [teamId];
  const rows = await client.query(query, values);
  const exists = rows && rows.length ? rows[0].exists : false;
  return exists;
}

export async function dbCreateTeam(client: DBClient, userId: string, team: EntityTeam): Promise<string> {
  const teamQuery = `
    INSERT INTO teams (
      id,
      name,
      description,
      utc_time_created,
      utc_time_updated
    )
    VALUES ($1, $2, $3, $4, $5)
    ;
  `;
  const teamValues = [
    team.teamId,
    team.name,
    team.description,
    team.utcTimeCreated,
    team.utcTimeUpdated,
  ];

  const userQuery = `
    INSERT INTO users_teams_junction (user_id, team_id)
    VALUES ($1, $2)
    ;
  `;
  const userValues = [userId, team.teamId];

  await client.tx(async t => {
    await t.query(teamQuery, teamValues);
    await t.query(userQuery, userValues);
  });

  return team.teamId;
}

export async function dbUpdateTeam(
  client: DBClient,
  teamId: string,
  params: TeamUpsertParams,
  utcTimestamp: number,
): Promise<undefined | EntityTeam> {
  const query = `
    UPDATE teams 
    SET
      name = $1,
      description = $2,
      utc_time_updated = $3
    WHERE id = $4
    RETURNING *
    ;
  `;
  const values = [params.name, params.description, utcTimestamp, teamId];

  const rows = await client.query(query, values);
  const team = rows && rows.length ? convertRowToTeam(rows[0]) : undefined;
  return team;
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

