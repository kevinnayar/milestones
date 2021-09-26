import * as React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { BasePageTemplate } from '../templates/BasePageTemplate';
import { getTeam } from '../store/reducers/teams';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { PageContent } from '../components/PageContent/PageContent';
import { Loader } from '../components/Loader/Loader';
import { Button } from '../components/Button/Button';
import { Input } from '../components/Input/Input';
import { NoContent } from '../components/NoContent/NoContent';
import { PrivateComponentProps } from '../app';
import { RootState } from '../store/store';

export const TeamPage = ({ user: { userId, token }, match }: PrivateComponentProps) => {
  const { currentTeam } = useAppSelector((state: RootState) => state.teams);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const teamId = match?.params?.teamId;

  useEffect(() => {
    if (teamId) {
      const extra = { teamId };
      dispatch(getTeam({ userId, token, extra }));
    }
  }, [dispatch, token, userId, teamId]);

  useEffect(() => {
    if (teamId) {
      const extra = { teamId };
      dispatch(getTeam({ userId, token, extra }));
    }
  }, [dispatch, token, userId, teamId]);

  if (currentTeam.data === null) return <Loader />;

  return (
    <BasePageTemplate>
      <div className="page">
        <PageHeader title={currentTeam.data ? currentTeam.data.name : 'Team'}>
          {teamId && currentTeam.data && (
            <Button icon="edit" onClick={() => history.push(`/teams/${teamId}/edit`)}>
              Edit Team
            </Button>
          )}
        </PageHeader>
        <PageContent>
          {currentTeam.data ? (
            <div className="form">
              <form>
                <Input
                  name="name"
                  className="odd"
                  label="Name"
                  readOnly
                  value={currentTeam.data.name}
                  setValue={() => undefined}
                />
                <Input
                  name="description"
                  className="even"
                  label="Description"
                  readOnly
                  value={currentTeam.data.description || ''}
                  setValue={() => undefined}
                />
              </form>
            </div>
          ) : (
            <NoContent message="This team doesn't exist.">
              <Button icon="add" onClick={() => history.push('/teams/create')}>
                Create a Team
              </Button>
            </NoContent>
          )}
        </PageContent>
      </div>
    </BasePageTemplate>
  );
};
