import * as React from 'react';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { Maybe } from '../../../common/types/baseTypes';
import { EntityTrack, TrackCreateParams } from '../../../common/types/entityTypes';

type TrackFormProps = {
  teamId: string,
  track: Maybe<EntityTrack>;
  readOnly?: boolean;
  onSave?: (_params: TrackCreateParams) => void;
  onCancel?: () => void;
};

function createTrackParams(teamId: string, track: Maybe<EntityTrack>): TrackCreateParams {
  const now = DateTime.now();

  return track ? {
    teamId,
    name: track.name,
    description: track.description,
    config: track.config,
    startDate: track.startDate,
  } : {
    teamId,
    name: '',
    description: '',
    config: {
      type: 'TEMPLATE',
      template: 'CHILD_MILESTONES',
      version: 1,
    },
    startDate: {
      days: now.day,
      months: now.month,
      years: now.year,
    },
  };
}

export const TrackForm = ({ teamId, track, readOnly, onSave, onCancel }: TrackFormProps) => {
  const [params, setParams] = useState<TrackCreateParams>(createTrackParams(teamId, track));
  const canSubmit = Boolean(params.name && !readOnly && onSave);

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (canSubmit) {
      onSave(params);
    }
  };

  const validateName = (value: string) => {
    if (!value) throw new Error('Name is required');
  };

  return (
    <div className="form">
      <form onSubmit={onSubmit}>
        <Input
          name="name"
          className="odd"
          label="Name"
          required
          readOnly={readOnly}
          value={params.name}
          setValue={(name) => setParams({ ...params, name })}
          validateOrThrow={validateName}
        />
        <Input
          name="description"
          className="even"
          label="Description"
          readOnly={readOnly}
          value={params.description || ''}
          setValue={(description) => setParams({ ...params, description })}
        />
        {!readOnly ? (
          <div className="form__buttons">
            {onSave ? (
              <Button type="submit" disabled={!canSubmit}>
                Submit
              </Button>
            ) : null}

            {onCancel ? (
              <Button type="submit" variant="secondary" onClick={onCancel}>
                Cancel
              </Button>
            ) : null}
          </div>
        ) : null}
      </form>
    </div>
  );
};
