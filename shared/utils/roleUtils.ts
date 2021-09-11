import { RoleType, RightType } from '../types/entityTypes';

export function getValidRoles(): RoleType[] {
  return ['role_owner', 'role_editor', 'role_viewer'];
}

export function userCan(rightType: RightType, rightIds: RightType[]): boolean {
  return rightIds.includes(rightType);
}

