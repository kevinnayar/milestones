import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { createTeam, resetCreateTeam } from '../store/reducers/teams';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { PageContent } from '../components/PageContent/PageContent';
import { Input } from '../components/Input/Input';
import { Button } from '../components/Button/Button';
import { PrivateComponentProps } from '../app';
import { TeamCreateParams } from '../../common/types/entityTypes';
import { hasFetchSucceeded } from '../../common/utils/asyncUtils';
import { RootState } from '../store/store';

export const TeamCreatePage = ({ user: { userId, token } }: PrivateComponentProps) => {
  const { createdTeam } = useAppSelector((state: RootState) => state.teams);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const canSubmit = name && Boolean(name);

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (canSubmit) {
      const extra: TeamCreateParams = {
        name,
        description,
      };
      dispatch(createTeam({ userId, token, extra }));
    }
  };

  const validateName = (value: string) => {
    if (!value) throw new Error('Name is required');
  };

  useEffect(() => {
    dispatch(resetCreateTeam());
  }, [dispatch]);

  useEffect(() => {
    if (hasFetchSucceeded(createdTeam) && createdTeam.data && createdTeam.data.teamId) {
      const pathname = history.location.pathname.replace('/create', `/${createdTeam.data.teamId}`);
      history.push(pathname);
      dispatch(resetCreateTeam());
    }
  }, [dispatch, history, createdTeam]);

  return (
    <div className="page">
      <PageHeader title="Create team" />
      <PageContent>
        <div className="form">
          <form onSubmit={onSubmit}>
            <Input
              name="name"
              label="Name"
              required
              value={name}
              setValue={setName}
              validateOrThrow={validateName}
            />
            <Input
              name="decription"
              label="Description"
              value={description}
              setValue={setDescription}
            />
            <div>
              <Button type="submit" disabled={!canSubmit}>
                Submit
              </Button>
            </div>
          </form>
        </div>
      </PageContent>
    </div>
  );
};

