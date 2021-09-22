import { DBClient } from '../../serverTypes';
import { EntityUser } from '../../../shared/types/entityTypes';

export async function dbUserCreate(
  client: DBClient,
  user: EntityUser,
  hashedPassword: string
): Promise<string> {
  const userQuery = `
    INSERT INTO users (
      id,
      role_id,
      display_name,
      full_name,
      email,
      utc_time_created,
      utc_time_updated
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ;
  `;
  const userValues = [
    user.userId,
    user.roleId,
    user.displayName,
    user.fullName,
    user.email,
    user.utcTimeCreated,
    user.utcTimeUpdated,
  ];

  const credsQuery = `
    INSERT INTO user_credentials (
      user_id,
      email,
      hashed_password,
      utc_time_created,
      utc_time_updated
    )
    VALUES ($1, $2, $3, $4, $5)
    ;
  `;
  const credsValues = [
    user.userId,
    user.email,
    hashedPassword,
    user.utcTimeCreated,
    user.utcTimeUpdated,
  ];

  await client.tx(async (t) => {
    await t.query(userQuery, userValues);
    await t.query(credsQuery, credsValues);
  });

  return user.userId;
}

export async function dbUserExistsAndIsOwner(client: DBClient, userId: string): Promise<boolean> {
  const query = 'SELECT EXISTS (SELECT TRUE FROM users WHERE id = $1 AND role_id = $2)';
  const values = [userId, 'role_owner'];
  const rows = await client.query(query, values);
  const exists = rows && rows.length ? rows[0].exists : false;
  return exists;
}

type UserStoredCredentials = {
  userId: string;
  hashedPassword: string;
};

export async function dbUserGetFromCredentials(
  client: DBClient,
  email: string,
): Promise<void | UserStoredCredentials> {
  const rows = await client.query(
    'SELECT user_id, hashed_password FROM user_credentials WHERE email = $1;',
    [email],
  );

  const userId = rows && rows.length ? rows[0].user_id : undefined;
  const hashedPassword = rows && rows.length ? rows[0].hashed_password : undefined;

  if (!userId || !hashedPassword) return undefined;

  return {
    userId,
    hashedPassword,
  };
}

function convertToEntityUser(row: any): EntityUser {
  return {
    userId: row.id,
    roleId: row.role_id,
    displayName: row.display_name,
    imgUrl: row.img_url,
    fullName: row.full_name,
    email: row.email,
    utcTimeCreated: row.utc_time_created,
    utcTimeUpdated: row.utc_time_updated,
  };
}

export async function dbUserGet(
  client: DBClient,
  userId?: string,
  email?: string,
): Promise<void | EntityUser> {
  if (!userId && !email) {
    throw new Error('Cannot get user, neither user ID or email where provided');
  }

  let query: string;
  if (userId && !email) query = 'SELECT * FROM users WHERE id = $1;';
  if (!userId && email) query = 'SELECT * FROM users WHERE email = $2;';
  if (userId && email) query = 'SELECT * FROM users WHERE id = $1 AND email = $2;';

  const values = [userId, email];

  const rows = await client.query(query, values);
  const user = rows && rows.length ? convertToEntityUser(rows[0]) : undefined;
  return user;
}

export async function dbUserEmailExists(client: DBClient, email: string): Promise<boolean> {
  const query = 'SELECT EXISTS (SELECT TRUE FROM users WHERE email = $1)';
  const values = [email];
  const rows = await client.query(query, values);
  const exists = rows && rows.length ? rows[0].exists : false;
  return exists;
}

export async function dbUserInTeam(
  client: DBClient,
  userId: string,
  teamId: string,
): Promise<boolean> {
  const query = 'SELECT EXISTS (SELECT TRUE FROM users WHERE id = $1 AND team_id = $2)';
  const values = [userId, teamId];
  const rows = await client.query(query, values);
  const exists = rows && rows.length ? rows[0].exists : false;
  return exists;
}
