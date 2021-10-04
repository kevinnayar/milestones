import * as React from 'react';
import { useState } from 'react';
import { DateTime } from 'luxon';
import {
  getTimeRangeForTrack,
  getPeriodsForTimeRange,
  getAbsoluteRangeToMilestoneMap,
} from '../../../common/utils/dateTimeUtils';
import { slugify } from '../../../common/utils/baseUtils';
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

const TrackTimeline = ({ periods, startTimeToMilestoneMap, onSetModal }: TimelineProps) => {
  const format = DateTime.DATE_MED;
  return (
    <div className="track-calendar__timeline">
      {periods.map((time) => {
        const formatted = time.toLocaleString(format);
        const milestoneMaybe = startTimeToMilestoneMap.get(time.toMillis());
        const monthClassName = slugify(`month-of-${time.toFormat('MMM')}`);

        return (
          <div key={formatted} className={`day ${monthClassName}`}>
            <p className="day__date">{formatted}</p>
            {milestoneMaybe && (
              <i className="day__marker material-icons" onClick={() => onSetModal(milestoneMaybe)}>
                circle
              </i>
            )}
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

