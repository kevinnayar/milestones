import { isStrictStringOrThrow, isStrictStringNullVoidOrThrow } from '../../../shared/utils/typeUtils';
import { Maybe } from '../../../shared/types/baseTypes';
import { TeamCreateParams, EntityTeam } from '../../../shared/types/entityTypes';

export function validTeamCreateParams(params: any): TeamCreateParams {
  const name = isStrictStringOrThrow(params.name, 'Team name is required');
  const description: Maybe<string> = isStrictStringNullVoidOrThrow(
    params.description,
    'Optional value description is in an invalid format',
  );
  const imgUrl: Maybe<string> = isStrictStringNullVoidOrThrow(
    params.imgUrl,
    'Optional value image URL is in an invalid format',
  );

  const validParams: TeamCreateParams = {
    name,
    description,
    imgUrl,
  };

  return validParams;
}

export function convertRowToTeam(row: any): EntityTeam {
  const team: EntityTeam = {
    teamId: row.id,
    trackIds: row.track_ids,
    name: row.name,
    description: row.description,
    imgUrl: row.img_url,
    utcTimeCreated: row.utc_time_created,
    utcTimeUpdated: row.utc_time_updated,
  };
  return team;
}



