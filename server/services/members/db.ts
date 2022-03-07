import { convertRowToMember } from './utils';
import { TeamMember } from '../../../common/types/entityTypes';
import { DBClient } from '../../serverTypes';

export async function dbGetTeamMembers(client: DBClient, teamId: string): Promise<TeamMember[]> {
  const query = `
    SELECT users.* FROM users
      JOIN users_teams_junction ON users_teams_junction.user_id = users.id
      AND users_teams_junction.team_id = $1
   ;
  `;
  const values = [teamId];
  const rows = await client.query(query, values);
  const members = rows && rows.length ? rows.map(convertRowToMember) : [];
  return members;
}

export async function dbGetTeamMember(client: DBClient, teamId: string, memberId: string): Promise<void | TeamMember> {
  const query = `
    SELECT users.* FROM users
      JOIN users_teams_junction ON users_teams_junction.user_id = users.id
      AND users_teams_junction.team_id = $1
      AND users_teams_junction.user_id = $2
      LIMIT 1
   ;
  `;
  const values = [teamId, memberId];
  const rows = await client.query(query, values);
  const members = rows && rows.length ? convertRowToMember(rows[0]) : undefined;
  return members;
}


