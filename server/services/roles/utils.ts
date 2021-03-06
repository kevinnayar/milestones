import { Response } from 'express';
import { forbiddenException } from '../../api/apiExceptions';
import { dbRolesUserCan } from './db';
import { DBClient } from '../../serverTypes';
import { RightType } from '../../../common/types/entityTypes';

// @notes[Rights and Roles] There are 4 right types: `right_create`, `right_read`, `right_update`, `right_delete`
// @notes[Rights and Roles] These are leveraged to create 3 basic roles: `role_owner`, `role_editor`, and `role_viewer`

async function canOrThrow(
  res: Response,
  client: DBClient,
  userId: string,
  right: RightType,
): Promise<boolean> {
  const can = await dbRolesUserCan(client, right, userId);
  if (!can) {
    const msg = `User: ${userId} does not have permissions to ${right.replace('right_', '')}`;
    forbiddenException(res, msg);
  }
  return can;
}

export const canReadOrThrow = async (res: Response, client: DBClient, userId: string) => {
  return await canOrThrow(res, client, userId, 'right_read');
};

export const canCreateOrThrow = async (res: Response, client: DBClient, userId: string) => {
  return await canOrThrow(res, client, userId, 'right_create');
};

export const canUpdateOrThrow = async (res: Response, client: DBClient, userId: string) => {
  return await canOrThrow(res, client, userId, 'right_update');
};

export const canDeleteOrThrow = async (res: Response, client: DBClient, userId: string) => {
  return await canOrThrow(res, client, userId, 'right_delete');
};


