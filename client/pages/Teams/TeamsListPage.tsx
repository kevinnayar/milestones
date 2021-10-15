import * as React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { BasePageTemplate } from '../../templates/BasePageTemplate';
import { getTeams } from '../../store/reducers/teams';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { PageContent } from '../../components/PageContent/PageContent';
import { Loader } from '../../components/Loader/Loader';
import { Button } from '../../components/Button/Button';
import { TeamsList } from '../../components/Teams/TeamsList';
import { PrivateComponentProps } from '../../routes';
import { RootState } from '../../store/store';

export const TeamsListPage = ({ user: { userId, token } }: PrivateComponentProps) => {
  const { allTeams } = useAppSelector((state: RootState) => state.teams);
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getTeams(userId));
  }, [dispatch, token, userId]);

  if (allTeams.data === null) return <Loader />;

  return (
    <BasePageTemplate>
      <PageHeader title="Teams">
        <Button icon="add" onClick={() => history.push('/teams/create')}>
          {allTeams.data && allTeams.data.length ? 'Add' : 'Create'} Team
        </Button>
      </PageHeader>
      <PageContent>
        <div className="section">
          <TeamsList teams={allTeams.data} />
        </div>
      </PageContent>
    </BasePageTemplate>
  );
};

