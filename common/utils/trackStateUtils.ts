import { DateTime } from 'luxon';
import { getMilestonesForTemplate } from './trackStateUtils.data';
import { SimpleDate } from '../types/baseTypes';
import {
  EntityMilestone,
  ResolvedMilestone,
  TrackAction,
  TrackState,
} from '../types/entityTypes';

function convertToResolvedMilestone(startDate: SimpleDate, milestone: EntityMilestone): ResolvedMilestone {
  const now = DateTime.local(startDate.years, startDate.months, startDate.days);
  const start = now.plus(milestone.ranges.relative.start).toMillis();
  const stop = milestone.ranges.relative.stop !== null
    ? now.plus(milestone.ranges.relative.stop).toMillis()
    : null;

  const updated: ResolvedMilestone = {
    ...milestone,
    ranges: {
      ...milestone.ranges,
      absolute: {
        start,
        stop,
      },
    },
  };

  return updated;
}

export function getResolvedTrackState(startDate: SimpleDate, milestones: EntityMilestone[]): TrackState {
  const ids: string[] = [];
  const idMap: { [k: string]: EntityMilestone } = {};

  for (const m of milestones) {
    const milestone: ResolvedMilestone = (!m.ranges.absolute)
      ? convertToResolvedMilestone(startDate, m)
      : m;
    ids.push(milestone.id);
    idMap[milestone.id] = milestone;
  }

  return {
    startDate,
    ids,
    idMap,
  };
}

export function reorderTrackState(trackState: TrackState): TrackState {
  const idsWithDates: [string, number][] = [];
  const idMap: { [k: string]: EntityMilestone } = {};

  for (const m of Object.values(trackState.idMap)) {
    const milestone: ResolvedMilestone = !m.ranges.absolute
      ? convertToResolvedMilestone(trackState.startDate, m)
      : m;
    idsWithDates.push([milestone.id, milestone.ranges.absolute.start]);
    idMap[milestone.id] = milestone;
  }

  const ids: string[] = idsWithDates.sort((a, b) => a[1] - b[1]).map((i) => i[0]);

  return {
    startDate: trackState.startDate,
    ids,
    idMap,
  };
}

export function trackStateReducer(action: TrackAction, state: TrackState): TrackState {
  switch (action.type) {
    case 'START': {
      const { startDate, template, version } = action.payload;
      const milestones = getMilestonesForTemplate(template, version);
      const newState = getResolvedTrackState(startDate, milestones);
      return newState;
    }

    case 'ADD': {
      const newState = { ...state };
      newState.ids.push(action.payload.milestone.id);
      newState.idMap[action.payload.milestone.id] = action.payload.milestone;

      return reorderTrackState(newState);
    }

    case 'UPDATE': {
      const found = state.idMap[action.payload.milestone.id];

      if (found) {
        const newState = { ...state };
        newState.idMap[action.payload.milestone.id] = action.payload.milestone;

        return reorderTrackState(newState);
      }

      return state;
    }

    case 'REMOVE': {
      const found = state.idMap[action.payload.milestoneId];

      if (found) {
        const ids = state.ids.filter((id) => id !== action.payload.milestoneId);
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        const { [action.payload.milestoneId]: _ignore, ...idMap } = state.idMap;

        const newState = {
          ...state,
          ids,
          idMap,
        };

        return reorderTrackState(newState);
      }

      return state;
    }

    case 'INCOMPLETE': {
      const { milestoneId } = action.payload;
      const found = state.idMap[milestoneId];

      if (found) {
        const newState: TrackState = {
          ...state,
          idMap: {
            ...state.idMap,
            [milestoneId]: {
              ...found,
              ranges: {
                ...found.ranges,
                completed: null,
              },
            },
          },
        };
        return newState;
      }

      return state;
    }

    case 'COMPLETE': {
      const { milestoneId, completedRanges: completed } = action.payload;
      const found = state.idMap[milestoneId];

      if (found) {
        const newState: TrackState = {
          ...state,
          idMap: {
            ...state.idMap,
            [milestoneId]: {
              ...found,
              ranges: {
                ...found.ranges,
                completed,
              },
            },
          },
        };
        return newState;
      }

      return state;
    }

    default: {
      throw new Error('Track State Reducer - invalid action type');
    }
  }
}

