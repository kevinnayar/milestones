import { TrackTemplate } from '../../../shared/types/entityTypes';

export function getInitTrackState(template: TrackTemplate, version: number) {
  switch (template) {
    case 'CHILD_MILESTONES': {
      if (version === 1) {
        return {};
      }
      throw new Error(`Unsupported track state for template: '${template}' and version: '${version}'`);
    }
    case 'PET_MILESTONES': {
      if (version === 1) {
        return {};
      }
      throw new Error(`Unsupported track state for template: '${template}' and version: '${version}'`);
    }
    default: {
      throw new Error(`Unsupported track state for template: '${template}'`);
    }
  }
}

