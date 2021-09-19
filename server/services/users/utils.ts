import {
  isStrictStringOrThrow,
  isStrictStringNullVoidOrThrow,
  inStringUnionOrThrow,
  isValidEmailOrThrow,
} from '../../../shared/utils/typeUtils';
import { Maybe } from '../../../shared/types/baseTypes';
import { getValidRoles } from '../../../shared/utils/roleUtils';
import {
  UserCreateParams,
  RoleType,
  EntityUser,
  UserNoPII,
  RightType,
} from '../../../shared/types/entityTypes';

export function validUserCreateParams(params: any): UserCreateParams {
  const email = isValidEmailOrThrow(params.email, 'A valid email is required');
  const password = isStrictStringOrThrow(params.password, 'Password is required');

  const roleId: RoleType = inStringUnionOrThrow(params.roleId, getValidRoles(), 'A valid role is required');
  const imgUrl: Maybe<string> = isStrictStringNullVoidOrThrow(
    params.imgUrl,
    'Optional value image URL is in an invalid format',
  );
  const displayName = isStrictStringOrThrow(params.displayName, 'Display name is required');
  const firstName = isStrictStringOrThrow(params.firstName, 'First name is required');
  const lastName = isStrictStringOrThrow(params.lastName, 'Last name is required');
  const teamName = isStrictStringOrThrow(params.displayName, 'Team name is required');

  const validParams: UserCreateParams = {
    roleId,
    teamName,
    displayName,
    imgUrl,
    firstName,
    lastName,
    email,
    password,
  };

  return validParams;
}

export function userRemovePII(user: EntityUser, rightIds?: RightType[]): UserNoPII {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { roleId: _r, firstName: _f, lastName: _l, email: _e, ...userNoPII } = user;
  const userWithRights: UserNoPII = {
    ...userNoPII,
    rightIds,
  };
  return userWithRights;
}
