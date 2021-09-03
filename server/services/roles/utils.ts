import { RoleType, RightType } from '../../../shared/types/entityTypes';

export function getValidRoles(): RoleType[] {
  return ['role_owner', 'role_editor', 'role_viewer'];
}

export function userCan(rightType: RightType, rightIds: string[]): boolean {
  const rightPrefixed = `right_${rightType}`;
  return rightIds.includes(rightPrefixed);
}

