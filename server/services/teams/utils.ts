import { isStrictStringOrThrow, isStrictStringNullVoidOrThrow } from '../../../shared/utils/typeUtils';
import { Maybe } from '../../../shared/types/baseTypes';
import { TeamCreateParams } from '../../../shared/types/entityTypes';

export function validTeamCreateParams(params: any): TeamCreateParams {
  const name = isStrictStringOrThrow(params.name, 'Team name is required');
  const description: Maybe<string> = isStrictStringNullVoidOrThrow(
    params.description,
    'Image URL is in an invalid format',
  );
  const imgUrl: Maybe<string> = isStrictStringNullVoidOrThrow(params.imgUrl, 'Image URL is in an invalid format');

  const validParams: TeamCreateParams = {
    name,
    description,
    imgUrl,
  };

  return validParams;
}


