import { DBClient } from '../../types';
import { EntityUser } from '../../../shared/types/entityTypes';

export async function dbUserCreate(client: DBClient, user: EntityUser): Promise<string> {
  const query = `
    INSERT INTO users (
      id,
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

export async function dbUserGetRights(client: DBClient, userId: string): Promise<string[]> {
  const query = `
    SELECT roles.right_ids
      FROM roles
      JOIN users ON users.role_id = roles.id
      WHERE users.id = $1
    ;
  `;
  const values = [userId];
  const rows = await client.one(query, values);
  const rightIds = rows.length ? rows[0].right_ids : [];
  return rightIds;
}

export async function dbUserExistsAndIsOwner(client: DBClient, userId: string): Promise<boolean> {
  const query = 'SELECT EXISTS (SELECT TRUE FROM users WHERE id = $1 AND role_id = $2)';
  const values = [userId, 'role_owner'];
  const rows = await client.query(query, values);
  const exists = rows && rows.length ? rows[0].exists : false;
  return exists;
}

export async function dbUserEmailExists(client: DBClient, email: string): Promise<boolean> {
  const query = 'SELECT EXISTS (SELECT TRUE FROM users WHERE email = $1)';
  const values = [email];
  const rows = await client.query(query, values);
  const exists = rows && rows.length ? rows[0].exists : false;
  return exists;
}

export async function dbUserInTeam(client: DBClient, userId: string, teamId: string): Promise<boolean> {
  const query = 'SELECT EXISTS (SELECT TRUE FROM users WHERE id = $1 AND team_id = $2)';
  const values = [userId, teamId];
  const rows = await client.query(query, values);
  const exists = rows && rows.length ? rows[0].exists : false;
  return exists;
}





