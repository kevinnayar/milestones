import { getValidRoles } from '../roles/utils';
import {
  isStrictStringOrThrow,
  isStrictStringNullVoidOrThrow,
  inStringUnionOrThrow,
  isValidEmailOrThrow,
} from '../../../shared/utils/typeUtils';
import { Maybe } from '../../../shared/types/baseTypes';
import { UserCreateParams, RoleType, EntityUser, UserNoPII } from '../../../shared/types/entityTypes';

export function validUserCreateParams(params: any): UserCreateParams {
  const roleId: RoleType = inStringUnionOrThrow(params.roleId, getValidRoles(), 'A valid role is required');
  const teamId: Maybe<string> = isStrictStringNullVoidOrThrow(params.teamId, 'Team ID is in an invalid format');
  const displayName = isStrictStringOrThrow(params.displayName, 'Display name is required');
  const imgUrl: Maybe<string> = isStrictStringNullVoidOrThrow(params.imgUrl, 'Image URL is in an invalid format');
  const firstName = isStrictStringOrThrow(params.firstName, 'First name is required');
  const lastName = isStrictStringOrThrow(params.lastName, 'Last name is required');
  const email = isValidEmailOrThrow(params.email, 'A valid email is required');

  const validParams: UserCreateParams = {
    roleId,
    teamId,
    displayName,
    imgUrl,
    firstName,
    lastName,
    email,
  };

  return validParams;
}

export function userRemovePII(user: EntityUser): UserNoPII {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { roleId: _r, firstName: _f, lastName: _l, email: _e, ...userNoPII } = user;
  return userNoPII;
}



