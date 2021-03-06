import { DateTime } from 'luxon';
import { getMilestonesForTemplate } from './trackStateUtils.data';
import {
  getResolvedTrackState,
  reorderTrackState,
  trackStateReducer,
} from './trackStateUtils';
import {
  EntityMilestone,
  TrackState,
  TrackActionStart,
  TrackActionUpdate,
  TrackActionAdd,
  TrackActionRemove,
  TrackActionComplete,
  TrackActionIncomplete,
} from '../types/entityTypes';

const baseMilestone: EntityMilestone = {
  id: '1',
  name: 'whatever',
  description: 'whatever',
  ranges: {
    absolute: null,
    completed: null,
    relative: {
      start: {
        years: 0,
        months: 0,
        days: 0,
      },
      stop: null,
    },
  },
};

const milestonesInit: EntityMilestone[] = [
  baseMilestone,
  {
    ...baseMilestone,
    id: '2',
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 2,
        },
        stop: null,
      },
    },
  },
  {
    ...baseMilestone,
    id: '3',
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 4,
        },
        stop: null,
      },
    },
  },
  {
    ...baseMilestone,
    id: '4',
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 6,
        },
        stop: {
          years: 0,
          months: 0,
          days: 8,
        },
      },
    },
  },
];

const actionStart: TrackActionStart = {
  type: 'START',
  payload: {
    startDate: {
      days: 4,
      months: 12,
      years: 2021,
    },
    template: 'CHILD_MILESTONES',
    version: 1,
  },
};

const emptyState = {
  startDate: actionStart.payload.startDate,
  ids: [],
  idMap: {},
};

let state: TrackState = trackStateReducer(actionStart, emptyState);

describe('trackStateUtils', () => {
  test('getMilestonesForTemplate', () => {
    const milestonesChildV1 = getMilestonesForTemplate('CHILD_MILESTONES', 1);
    const milestonesChildV2 = getMilestonesForTemplate('CHILD_MILESTONES', 2);
    const milestonesPetV1 = getMilestonesForTemplate('PET_MILESTONES', 1);

    expect(milestonesChildV1).toBeDefined();
    expect(milestonesChildV2).toBeDefined();
    expect(milestonesPetV1).toBeDefined();

    // @ts-ignore
    expect(() => getMilestonesForTemplate('whatever', 1)).toThrow(
      "Unsupported track state for template: 'whatever'",
    );
    expect(() => getMilestonesForTemplate('CHILD_MILESTONES', 3)).toThrow(
      "Unsupported track state for template: 'CHILD_MILESTONES' and version: '3'",
    );
    expect(() => getMilestonesForTemplate('PET_MILESTONES', 2)).toThrow(
      "Unsupported track state for template: 'PET_MILESTONES' and version: '2'",
    );
  });

  test('getResolvedTrackState', () => {
    const milestones = [...milestonesInit];
    const startDate = {
      days: 1,
      months: 1,
      years: 2020,
    };
    const trackState = getResolvedTrackState(startDate, milestones);

    // correct number of items created
    expect(Object.keys(trackState.idMap).length).toEqual(4);
    expect(trackState.ids.length).toEqual(4);

    // keys created in correct order
    const keys = {
      zero: trackState.ids[0],
      one: trackState.ids[1],
      two: trackState.ids[2],
      three: trackState.ids[3],
    };

    expect(keys.zero).toEqual('1');
    expect(keys.one).toEqual('2');
    expect(keys.two).toEqual('3');
    expect(keys.three).toEqual('4');

    // correct absolute time ranges - starts and stops
    expect(trackState.idMap[keys.zero].ranges.absolute.start).toEqual(
      DateTime.local(startDate.years, startDate.months, startDate.days).toMillis(),
    );
    expect(trackState.idMap[keys.zero].ranges.absolute.stop).toEqual(null);

    expect(trackState.idMap[keys.one].ranges.absolute.start).toEqual(
      DateTime.local(startDate.years, startDate.months, 3).toMillis(),
    );
    expect(trackState.idMap[keys.one].ranges.absolute.stop).toEqual(null);

    expect(trackState.idMap[keys.two].ranges.absolute.start).toEqual(
      DateTime.local(startDate.years, startDate.months, 5).toMillis(),
    );
    expect(trackState.idMap[keys.two].ranges.absolute.stop).toEqual(null);

    expect(trackState.idMap[keys.three].ranges.absolute.start).toEqual(
      DateTime.local(startDate.years, startDate.months, 7).toMillis(),
    );
    expect(trackState.idMap[keys.three].ranges.absolute.stop).toEqual(
      DateTime.local(startDate.years, startDate.months, 9).toMillis(),
    );
  });

  test('reorderTrackState', () => {
    const milestones = [...milestonesInit];
    const startDate = {
      days: 1,
      months: 1,
      years: 2020,
    };
    const trackState = getResolvedTrackState(startDate, milestones);

    // --- ADD id: 'NEW'
    const addedMilestone = {
      ...baseMilestone,
      id: 'NEW',
      ranges: {
        absolute: null,
        completed: null,
        relative: {
          start: {
            years: 0,
            months: 0,
            days: 3,
          },
          stop: null,
        },
      },
    };

    // mutate to out of order
    trackState.ids.push(addedMilestone.id);
    trackState.idMap[addedMilestone.id] = addedMilestone;

    let reorderedTrackState = reorderTrackState(trackState);

    expect(Object.keys(reorderedTrackState.idMap).length).toEqual(Object.keys(trackState.idMap).length);
    expect(reorderedTrackState.ids.length).toEqual(trackState.ids.length);

    // trackState:          '["START","1","2","3","4","NEW"]';
    // reorderedTrackState: '["START","1","NEW","2","3","4"]';
    expect(JSON.stringify(reorderedTrackState.ids)).not.toEqual(JSON.stringify(trackState.ids));
    expect(reorderedTrackState.ids[2]).toEqual(addedMilestone.id);

    // --- REMOVE id: '3'
    const newIds = trackState.ids.filter((id) => id !== '3');
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars, quote-props
    const { '3': _ignore, ...newIdMap } = trackState.idMap;

    // mutate to out of order
    reorderedTrackState = {
      ...reorderedTrackState,
      ids: newIds,
      idMap: newIdMap,
    };

    reorderedTrackState = reorderTrackState(reorderedTrackState);

    // trackState:          '["1","2","3","4","START","NEW"]';
    // reorderedTrackState: '["1","2","4","START","NEW"]';
    expect(Object.keys(reorderedTrackState.idMap).length).toEqual(Object.keys(trackState.idMap).length - 1);
    expect(reorderedTrackState.ids.length).toEqual(trackState.ids.length - 1);
  });

  test('trackStateReducer: START', () => {
    const absoluteRanges = [];
    const completedRanges = [];
    const idMapIds = [];

    for (const milestone of Object.values(state.idMap)) {
      absoluteRanges.push(milestone.ranges.absolute);
      completedRanges.push(milestone.ranges.completed);
      idMapIds.push(milestone.id);
    }

    expect(state.ids[0]).toEqual('birth');

    expect(state.ids.length).toEqual(11);
    expect(Object.keys(state.idMap).length).toEqual(11);

    expect(state.ids.length).toEqual(idMapIds.length);
    expect([...state.ids].sort().join()).toEqual([...idMapIds].sort().join());

    expect(absoluteRanges.every((r) => r !== null)).toEqual(true);
    expect(completedRanges.every((r) => r === null)).toEqual(true);
  });

  test('trackStateReducer: UPDATE', () => {
    const copied = { ...state.idMap.smiles };
    const action: TrackActionUpdate = {
      type: 'UPDATE',
      payload: {
        milestone: {
          ...copied,
          name: 'Frowns ????',
        },
      },
    };

    state = trackStateReducer(action, state);

    expect(state.idMap.smiles.id).toEqual('smiles');
    expect(state.idMap.smiles.name).toEqual('Frowns ????');
    expect(state.ids.length).toEqual(11);
    expect(Object.keys(state.idMap).length).toEqual(11);
  });

  test('trackStateReducer: ADD', () => {
    const copied = { ...state.idMap.smiles };
    const action: TrackActionAdd = {
      type: 'ADD',
      payload: {
        milestone: {
          ...copied,
          id: 'test',
          name: 'Test!',
        },
      },
    };

    state = trackStateReducer(action, state);

    expect(state.ids.length).toEqual(12);
    expect(Object.keys(state.idMap).length).toEqual(12);
  });

  test('trackStateReducer: REMOVE', () => {
    const action: TrackActionRemove = {
      type: 'REMOVE',
      payload: {
        milestoneId: 'test',
      },
    };

    state = trackStateReducer(action, state);

    expect(state.ids.length).toEqual(11);
    expect(Object.keys(state.idMap).length).toEqual(11);
  });

  test('trackStateReducer: COMPLETE', () => {
    const before = state.idMap.smiles;
    expect(before.ranges.completed).toEqual(null);

    const action: TrackActionComplete = {
      type: 'COMPLETE',
      payload: {
        milestoneId: 'smiles',
        completedRanges: {
          start: 1,
          stop: null,
        },
      },
    };

    state = trackStateReducer(action, state);

    expect(state.ids.length).toEqual(11);
    expect(Object.keys(state.idMap).length).toEqual(11);

    const after = state.idMap.smiles;
    expect(after.ranges.completed.start).toEqual(1);
    expect(after.ranges.completed.stop).toEqual(null);
  });

  test('trackStateReducer: INCOMPLETE', () => {
    const before = state.idMap.smiles;
    expect(before.ranges.completed.start).toEqual(1);
    expect(before.ranges.completed.stop).toEqual(null);

    const action: TrackActionIncomplete = {
      type: 'INCOMPLETE',
      payload: {
        milestoneId: 'smiles',
      },
    };

    state = trackStateReducer(action, state);

    expect(state.ids.length).toEqual(11);
    expect(Object.keys(state.idMap).length).toEqual(11);

    const after = state.idMap.smiles;
    expect(after.ranges.completed).toEqual(null);
  });
});

