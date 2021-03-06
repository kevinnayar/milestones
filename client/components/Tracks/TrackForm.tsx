import * as React from 'react';
import { useState } from 'react';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { Maybe } from '../../../common/types/baseTypes';
import { EntityTrack, TrackUpsertParams } from '../../../common/types/entityTypes';

type TrackFormProps = {
  teamId: string,
  track: Maybe<EntityTrack>;
  readOnly?: boolean;
  onSave?: (_params: TrackUpsertParams) => void;
  onCancel?: () => void;
};

function createTrackParams(teamId: string, track: Maybe<EntityTrack>): TrackUpsertParams {
  // const now = DateTime.now();
  // const startDate = {
  //   days: now.day,
  //   months: now.month,
  //   years: now.year,
  // };
  // const version = 1;

  const startDate = {
    days: 4,
    months: 12,
    years: 2021,
  };
  const version = 2;

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
      template: 'CHILD_MILESTONES',
      version,
    },
    startDate,
  };
}

export const TrackForm = ({ teamId, track, readOnly, onSave, onCancel }: TrackFormProps) => {
  const [params, setParams] = useState<TrackUpsertParams>(createTrackParams(teamId, track));
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
