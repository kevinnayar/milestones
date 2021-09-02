import { DBClient } from '../../types';
import { EntityUser } from '../../../shared/types/entityTypes';

export async function dbUserExistsAndIsOwner(client: DBClient, userId: string): Promise<boolean> {
  const query = 'SELECT EXISTS (SELECT TRUE FROM users WHERE user_id = $1 AND role_id = $2)';
  const values = [userId, 'role_owner'];
  const rows = await client.query(query, values);
  const exists = rows && rows.length ? rows[0].exists : false;
  return exists;
}

export async function dbUserCreate(client: DBClient, user: EntityUser): Promise<string> {
  const query = `
    INSERT INTO users (
      user_id,
      role_id,
      team_id,
      display_name,
      first_name,
      last_name,
      email,
      utc_time_created,
      utc_time_updated
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING user_id
    ;
  `;
  const values = [
    user.userId,
    user.roleId,
    user.teamId || null,
    user.displayName,
    user.firstName,
    user.lastName,
    user.email,
    user.utcTimeCreated,
    user.utcTimeUpdated,
  ];

  await client.query(query, values);
  return user.userId;
}



