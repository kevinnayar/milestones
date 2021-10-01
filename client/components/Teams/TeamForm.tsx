import * as React from 'react';
import { useState } from 'react';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { Maybe } from '../../../common/types/baseTypes';
import { EntityTeam, TeamUpsertParams } from '../../../common/types/entityTypes';

type TeamFormProps = {
  team: Maybe<EntityTeam>;
  readOnly?: boolean;
  onSave?: (_params: TeamUpsertParams) => void;
  onCancel?: () => void;
};

function createTeamParams(team: Maybe<EntityTeam>): TeamUpsertParams {
  return team ? {
    name: team.name,
    description: team.description,
  } : {
    name: '',
    description: '',
  };
}

export const TeamForm = ({ team, readOnly, onSave, onCancel }: TeamFormProps) => {
  const [params, setParams] = useState<TeamUpsertParams>(createTeamParams(team));
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
