import {
  isStrictStringOrThrow,
  inStringUnionOrThrow,
  isStrictStringNullVoidOrThrow,
  isAbsoluteDateOrThrow,
  isNumberOrThrow,
} from '../../../shared/utils/typeUtils';
import { Maybe } from '../../../shared/types/baseTypes';
import {
  TrackCreateParams,
  TrackType,
  TrackConfigTemplate,
  TrackConfigCustom,
  TrackTemplate,
} from '../../../shared/types/entityTypes';

function validateTemplateConfig(config: any): TrackConfigTemplate | TrackConfigCustom {
  const allowedTracks: TrackType[] = ['CUSTOM', 'TEMPLATE'];
  const type: TrackType = inStringUnionOrThrow(config.type, allowedTracks, 'A valid track type is required');

  switch (type) {
    case 'CUSTOM': {
      return {
        type: 'CUSTOM',
      };
    }
    case 'TEMPLATE': {
      const allowedTemplates: TrackTemplate[] = ['CHILD_MILESTONES', 'PET_MILESTONES'];
      const template = inStringUnionOrThrow(config.template, allowedTemplates, 'A valid track template is required');
      const version = isNumberOrThrow(config.version, 'Track version is invalid');
      return {
        type: 'TEMPLATE',
        template,
        version,
      };
    }
    default: {
      throw new Error(`Unsupported template type: '${type}'`);
    }
  }
}

export function validateTrackCreateParams(params: any): TrackCreateParams {
  const name = isStrictStringOrThrow(params.name, 'A name is required');
  const description: Maybe<string> = isStrictStringNullVoidOrThrow(params.description, 'Description is in an invalid format');
  const imgUrl: Maybe<string> = isStrictStringNullVoidOrThrow(params.imgUrl, 'Image URL is in an invalid format');
  const startDate = isAbsoluteDateOrThrow(params.startDate, 'A valid start date is required');
  const config = validateTemplateConfig(params.config);

  return {
    name,
    description,
    imgUrl,
    config,
    startDate,
  };
}
