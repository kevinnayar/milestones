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


