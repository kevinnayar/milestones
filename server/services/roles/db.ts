import { userCan } from './utils';
import { RightType } from '../../../shared/types/entityTypes';
import { DBClient } from '../../types';

export async function dbUserGetRights(client: DBClient, userId: string): Promise<RightType[]> {
  const query = `
    SELECT roles.right_ids
      FROM roles
      JOIN users ON users.role_id = roles.id
      WHERE users.id = $1
    ;
  `;
  const values = [userId];
  const rows = await client.one(query, values);
  const rightIds: RightType[] = rows.length ? rows[0].right_ids as any : [];
  return rightIds;
}

export async function dbUserCan(client: DBClient, rightType: RightType, userId: string): Promise<boolean> {
  const rights = await dbUserGetRights(client, userId);
  return userCan(rightType, rights);
}





