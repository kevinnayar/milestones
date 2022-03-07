import * as React from 'react';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { TeamMember } from '../../../common/types/entityTypes';

type Props = {
  teamId: string;
  member: TeamMember;
  readOnly?: boolean;
  onSave?: (_params: any) => void;
  onCancel?: () => void;
};

export const MemberForm = ({ member, readOnly, onSave, onCancel }: Props) => {
  const canSubmit = Boolean(!readOnly && onSave);

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  return (
    <div className="form">
      <form onSubmit={onSubmit}>
        <Input
          name="displayName"
          className="odd"
          label="Name"
          required
          readOnly={readOnly}
          value={member.displayName}
          setValue={() => undefined}
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
