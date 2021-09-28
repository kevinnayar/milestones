import {
  isStrictStringOrThrow,
  isMaybeStringOrThrow,
  inStringUnionOrThrow,
  isValidEmailOrThrow,
} from '../../../common/utils/typeUtils';
import { Maybe } from '../../../common/types/baseTypes';
import { getValidRoles } from '../../../common/utils/roleUtils';
import {
  UserCreateParams,
  RoleType,
  EntityUser,
  UserNoPII,
  RightType,
} from '../../../common/types/entityTypes';

export function validUserCreateParams(params: any): UserCreateParams {
  const email = isValidEmailOrThrow(params.email, 'A valid email is required');
  const password = isStrictStringOrThrow(params.password, 'Password is required');

  const roleId: RoleType = inStringUnionOrThrow(params.roleId, getValidRoles(), 'A valid role is required');
  const imgUrl: Maybe<string> = isMaybeStringOrThrow(
    params.imgUrl,
    'Optional value image URL is in an invalid format',
  );
  const displayName = isStrictStringOrThrow(params.displayName, 'Display name is required');
  const fullName = isStrictStringOrThrow(params.fullName, 'Full name is required');

  const validParams: UserCreateParams = {
    roleId,
    displayName,
    imgUrl,
    fullName,
    email,
    password,
  };

  return validParams;
}

export function userRemovePII(user: EntityUser, rightIds?: RightType[]): UserNoPII {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { roleId: _r, fullName: _f, email: _e, ...userNoPII } = user;
  const userWithRights: UserNoPII = {
    ...userNoPII,
    rightIds,
  };
  return userWithRights;
}
