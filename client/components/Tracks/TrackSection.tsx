import * as React from 'react';
import { useState } from 'react';
import { TrackListView } from './TrackListView';
import { TrackCalendarView } from './TrackCalendarView';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';
import { TrackReduction } from '../../../common/types/entityTypes';

type View = 'Calendar' | 'List';

type Props = {
  reduction: TrackReduction;
};

export const TrackSection = ({ reduction }: Props) => {
  const views: View[] = ['Calendar', 'List'];
  const [view, setView] = useState<View>('List');

  return (
    <div className="section">
      <h2>Milestone {view}</h2>
      <div className="track-section-buttons">
        <ButtonGroup items={views} currentItem={view} onClick={(v) => setView(v as View)} />
      </div>
      {view === 'Calendar' && <TrackCalendarView reduction={reduction} />}
      {view === 'List' && <TrackListView reduction={reduction} />}
    </div>
  );
};

