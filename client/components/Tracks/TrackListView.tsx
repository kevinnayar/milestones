import * as React from 'react';
import { DateTime } from 'luxon';
import {
  getTimeRangeForTrack,
  getPeriodsForTimeRange,
} from '../../../common/utils/dateTimeUtils';
import { TrackReduction } from '../../../common/types/entityTypes';

type CalendarProps = {
  reduction: TrackReduction;
};

export const TrackListView = ({ reduction }: CalendarProps) => {
  const { ids, idMap } = reduction.state;
  const range = getTimeRangeForTrack(idMap);
  const periods = getPeriodsForTimeRange(range, 'days');

  return (
    <div className="track-list">
      {ids.map((id, index) => {
        const milestone = idMap[id];
        const date = periods[index].toLocaleString(DateTime.DATE_MED);
        return (
          <div className="track-list--item" key={id}>
            <h2>{milestone.name}</h2>
            <p>{date}</p>
            <p>{milestone.description}</p>
          </div>
        );
      })}
    </div>
  );
};
