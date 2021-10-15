import {
  isStrictStringOrThrow,
  inStringUnionOrThrow,
  isMaybeStringOrThrow,
  isAbsoluteDateOrThrow,
  isNumberOrThrow,
} from '../../../common/utils/typeUtils';
import { Maybe } from '../../../common/types/baseTypes';
import {
  EntityTrack,
  TrackUpsertParams,
  TrackConfig,
  TrackTemplate,
} from '../../../common/types/entityTypes';

function validateTemplateConfig(config: any): TrackConfig {
  const allowedTemplates: TrackTemplate[] = ['CHILD_MILESTONES', 'PET_MILESTONES', 'CUSTOM_MILESTONES'];
  const template = inStringUnionOrThrow(config.template, allowedTemplates, 'A valid track template is required');
  const version = isNumberOrThrow(config.version, 'Track version is invalid');
  return {
    template,
    version,
  };
}

export function validateTrackUpsertParams(params: any): TrackUpsertParams {
  const name = isStrictStringOrThrow(params.name, 'A name is required');
  const teamId = isStrictStringOrThrow(params.teamId, 'A Team ID is required');
  const description: Maybe<string> = isMaybeStringOrThrow(params.description, 'Description is in an invalid format');
  const imgUrl: Maybe<string> = isMaybeStringOrThrow(params.imgUrl, 'Image URL is in an invalid format');
  const startDate = isAbsoluteDateOrThrow(params.startDate, 'A valid start date is required');
  const config = validateTemplateConfig(params.config);

  return {
    name,
    teamId,
    description,
    imgUrl,
    config,
    startDate,
  };
}

export function convertRowToTrack(row: any): EntityTrack {
  const config: TrackConfig = {
    template: row.template,
    version: parseInt(row.version, 10),
  };

  const track: EntityTrack = {
    trackId: row.id,
    teamId: row.team_id,
    config,
    name: row.name,
    description: row.description,
    startDate: row.start_date,
    imgUrl: row.img_url,
    utcTimeCreated: parseInt(row.utc_time_created, 10),
    utcTimeUpdated: parseInt(row.utc_time_updated, 10),
  };

  return track;
}


