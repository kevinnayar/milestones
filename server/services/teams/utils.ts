import { isStrictStringOrThrow, isMaybeStringOrThrow } from '../../../common/utils/typeUtils';
import { Maybe } from '../../../common/types/baseTypes';
import { TeamUpsertParams, EntityTeam } from '../../../common/types/entityTypes';

export function validTeamUpsertParams(params: any): TeamUpsertParams {
  const name = isStrictStringOrThrow(params.name, 'Team name is required');
  const description: Maybe<string> = isMaybeStringOrThrow(
    params.description,
    'Optional value description is in an invalid format',
  );
  const imgUrl: Maybe<string> = isMaybeStringOrThrow(
    params.imgUrl,
    'Optional value image URL is in an invalid format',
  );

  const validParams: TeamUpsertParams = {
    name,
    description,
    imgUrl,
  };

  return validParams;
}

export function convertRowToTeam(row: any): EntityTeam {
  const team: EntityTeam = {
    teamId: row.id,
    name: row.name,
    description: row.description,
    imgUrl: row.img_url,
    utcTimeCreated: parseInt(row.utc_time_created, 10),
    utcTimeUpdated: parseInt(row.utc_time_updated, 10),
  };
  return team;
}



