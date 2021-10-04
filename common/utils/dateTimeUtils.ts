import { DateTime } from 'luxon';
import { UtcTimeRange } from '../types/baseTypes';
import { ResolvedMilestone } from '../types/entityTypes';

// Map<number, ResolvedMilestone>
// Map<start, ResolvedMilestone>

export function getAbsoluteRangeToMilestoneMap(idMap: {
  [k: string]: ResolvedMilestone;
}): Map<number, ResolvedMilestone> {
  const map: Map<number, ResolvedMilestone> = new Map();

  for (const milestone of Object.values(idMap)) {
    map.set(milestone.ranges.absolute.start, milestone);
  }

  return map;
}

export function getTimeRangeForTrack(idMap: { [k: string]: ResolvedMilestone }): UtcTimeRange {
  const times = [];

  for (const milestone of Object.values(idMap)) {
    times.push(milestone.ranges.absolute.start);

    if (milestone.ranges.absolute.stop) {
      times.push(milestone.ranges.absolute.stop);
    }

    if (milestone.ranges.completed) {
      times.push(milestone.ranges.completed.start);

      if (milestone.ranges.completed.stop) {
        times.push(milestone.ranges.completed.stop);
      }
    }
  }

  times.sort();

  return {
    start: times[0],
    stop: times[times.length - 1],
  };
}

type Interval = 'days' | 'weeks' | 'months';

export function getPeriodsForTimeRange(range: UtcTimeRange, interval: Interval): DateTime[] {
  const times: DateTime[] = [];

  const start = DateTime.fromMillis(range.start);
  const stop = DateTime.fromMillis(range.stop);
  let current = start;

  const intervalMap = {
    days: { day: 1 },
    weeks: { week: 1 },
    months: { month: 1 },
  };
  const intervalConfig = intervalMap[interval];

  while (current < stop) {
    times.push(current);
    current = current.plus(intervalConfig);
  }

  times.push(stop);
  return times;
}

// const format = DateTime.DATE_MED;
// const stop = DateTime.fromMillis(range.stop).toLocaleString(format);


