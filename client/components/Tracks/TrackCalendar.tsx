import * as React from 'react';
import { useState } from 'react';
import { DateTime } from 'luxon';
import {
  getTimeRangeForTrack,
  getPeriodsForTimeRange,
  getAbsoluteRangeToMilestoneMap,
} from '../../../common/utils/dateTimeUtils';
import {
  TrackReduction,
  ResolvedMilestone,
} from '../../../common/types/entityTypes';

type ModalProps = {
  milestone: null | ResolvedMilestone,
  onClearModal: () => void;
};

const TrackModal = ({ milestone, onClearModal }: ModalProps) => {
  const format = DateTime.DATE_MED;
  return milestone ? (
    <div className="track-calendar__modal-overlay">
      <div className="track-calendar__modal modal">
        <i className="modal__close material-icons" onClick={onClearModal}>
          close
        </i>
        <div className="modal__details details">
          <h2 className="details__title">{milestone.name}</h2>
          <p className="details__date">{DateTime.fromMillis(milestone.ranges.absolute.start).toLocaleString(format)}</p>
          <p className="details__description">{milestone.description}</p>
        </div>
      </div>
    </div>
  ) : null;
};

type TimelineProps = {
  periods: DateTime[],
  startTimeToMilestoneMap: Map<number, ResolvedMilestone>,
  onSetModal: (_m: ResolvedMilestone) => void,
};

function getPaddingStartOfWeek(first: DateTime): DateTime[] {
  let periods = [];
  let day = first;

  while (day.toFormat('ccc') !== 'Sun') {
    day = day.minus({ days: 1 });
    periods = [day, ...periods];
  }

  return periods;
}

const TrackTimeline = ({ periods, startTimeToMilestoneMap, onSetModal }: TimelineProps) => {
  if (!periods.length) return null;

  const first = periods[0];
  const paddedPeriods = getPaddingStartOfWeek(first);

  return (
    <div className="track-calendar__timeline">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <p key={d} className="weekday">{d}</p>)}
      {[...paddedPeriods, ...periods].map((time) => {
        const milestoneMaybe = startTimeToMilestoneMap.get(time.toMillis());

        const key = time.toFormat('kkkk-LL-dd');
        const dayOfMonth = time.toFormat('d');

        const onClick = () => {
          if (time >= first) console.log(key);
        };

        return (
          <div
            key={key}
            className={`day ${time.toISODate() === first.toISODate() ? 'is-start-day' : ''} ${
              time < first ? 'is-before-start' : ''
            } month-of-${time.toFormat('MMM').toLowerCase()}`}
            onClick={onClick}
          >
            {dayOfMonth === '1' && (
              <h4 className="day__month-and-year">{time.toFormat('LLL kkkk')}</h4>
            )}
            {milestoneMaybe && (
              <i className="day__marker material-icons" onClick={() => onSetModal(milestoneMaybe)}>
                star
              </i>
            )}
            <p className="day__day-of-month">{dayOfMonth}</p>
          </div>
        );
      })}
    </div>
  );
};

type CalendarProps = {
  reduction: TrackReduction;
};

export const TrackCalendar = ({ reduction }: CalendarProps) => {
  const { idMap } = reduction.state;
  const range = getTimeRangeForTrack(idMap);
  const periods = getPeriodsForTimeRange(range, 'days');
  const startTimeToMilestoneMap = getAbsoluteRangeToMilestoneMap(idMap);
  const [milestone, setMilestone] = useState<ResolvedMilestone>(null);

  return (
    <div className="track-calendar">
      <TrackTimeline
        periods={periods}
        startTimeToMilestoneMap={startTimeToMilestoneMap}
        onSetModal={setMilestone}
      />
      <TrackModal milestone={milestone} onClearModal={() => setMilestone(null)} />
    </div>
  );
};

