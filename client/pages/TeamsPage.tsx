import * as React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { getTeams } from '../store/reducers/teams';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { PageContent } from '../components/PageContent/PageContent';
import { Loader } from '../components/Loader/Loader';
import { Button } from '../components/Button/Button';
import {
  Grid,
  gridFormatterListLength,
  gridFormatterDateTime,
  GridHeader,
} from '../components/Grid/Grid';
import { NoContent } from '../components/NoContent/NoContent';
import { PrivateComponentProps } from '../app';
import { RootState } from '../store/store';


export const TeamsPage = ({ user: { userId, token } }: PrivateComponentProps) => {
  const { allTeams } = useAppSelector((state: RootState) => state.teams);
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getTeams({ userId, token }));
  }, [dispatch, token, userId]);

  if (allTeams.data === null) return <Loader />;

  const headers: GridHeader[] = [
    ['name', 'Name', true],
    ['trackIds', 'Number of tracks', true, gridFormatterListLength],
    ['teamId', 'Team ID', false],
    ['description', 'Description', true],
    ['utcTimeCreated', 'Created on', true, gridFormatterDateTime],
    ['utcTimeUpdated', 'Updated on', true, gridFormatterDateTime],
  ];

  return (
    <div className="page">
      <PageHeader title="Teams">
        <Button icon="add" onClick={() => history.push('/teams/create')}>
          {allTeams.data && allTeams.data.length ? 'Add' : 'Create'} Team
        </Button>
      </PageHeader>
      <PageContent>
        {allTeams.data && allTeams.data.length ? (
          <Grid headers={headers} rows={allTeams.data} linker={{ route: '/teams/', key: 'teamId'}} />
        ) : (
          <NoContent message="You haven't created any teams yet.">
            <Button icon="add" onClick={() => history.push('/teams/create')}>
              Create Team
            </Button>
          </NoContent>
        )}
      </PageContent>
    </div>
  );
};

