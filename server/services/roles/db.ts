import { userCan } from '../../../shared/utils/roleUtils';
import { RightType } from '../../../shared/types/entityTypes';
import { DBClient } from '../../types';

export async function dbRolesGetRightsByUser(client: DBClient, userId: string): Promise<RightType[]> {
  const query = `
    SELECT roles.right_ids
      FROM roles
      JOIN users ON users.role_id = roles.id
      WHERE users.id = $1
    ;
  `;
  const values = [userId];
  const rows = await client.one(query, values);
  const rightIds: RightType[] = rows.right_ids ? rows.right_ids : [];
  return rightIds;
}

export async function dbRolesUserCan(client: DBClient, rightType: RightType, userId: string): Promise<boolean> {
  const rights = await dbRolesGetRightsByUser(client, userId);
  return userCan(rightType, rights);
}

export async function dbRolesGetRightsByRole(client: DBClient, roleId: string): Promise<RightType[]> {
  const query = 'SELECT right_ids FROM roles WHERE id = $1;';
  const values = [roleId];
  const rows = await client.one(query, values);
  const rightIds: RightType[] = rows.right_ids ? rows.right_ids : [];
  return rightIds;
}







