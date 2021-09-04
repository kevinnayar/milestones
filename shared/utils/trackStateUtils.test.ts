import {
  getMilestonesForTemplate,
  addStartToMilestones,
  getTrackStateWithAbsoluteDates,
} from './trackStateUtils';

describe('trackStateUtils', () => {
  test('getMilestonesForTemplate', () => {
    const milestonesChild = getMilestonesForTemplate('CHILD_MILESTONES', 1);
    const milestonesPet = getMilestonesForTemplate('PET_MILESTONES', 1);

    expect(milestonesChild).toBeDefined();
    expect(milestonesPet).toBeDefined();

    expect(() => getMilestonesForTemplate('CHILD_MILESTONES', 2)).toThrow(
      "Unsupported track state for template: 'CHILD_MILESTONES' and version: '2'",
    );
    expect(() => getMilestonesForTemplate('PET_MILESTONES', 2)).toThrow(
      "Unsupported track state for template: 'PET_MILESTONES' and version: '2'",
    );
  });

  test('addStartToMilestones', () => {
    const milestonesBase = getMilestonesForTemplate('CHILD_MILESTONES', 1);
    const milestonesWithStart = addStartToMilestones(milestonesBase);

    expect(milestonesWithStart.length).toBe(milestonesBase.length + 1);
    expect(milestonesWithStart[0].id).toBe('MILESTONE_ID_START');
  });

  // test('getTrackStateWithAbsoluteDates', () => {
  //   const milestonesBase = getMilestonesForTemplate('CHILD_MILESTONES', 1);
  //   const milestonesWithStart = addStartToMilestones(milestonesBase);
  //   const startDate = {
  //     days: 1,
  //     months: 1,
  //     years: 2020,
  //   };
  // });
});
