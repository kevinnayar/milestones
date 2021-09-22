import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { PageContent } from '../components/PageContent/PageContent';
import { Button } from '../components/Button/Button';
import { Loader } from '../components/Loader/Loader';
import { NoContent } from '../components/NoContent/NoContent';
import { useTeams } from '../hooks/useTeams';


export const TeamsPage = () => {
  const { isLoading, teams } = useTeams();
  const history = useHistory();
  const createRoute = '/teams/create';

  if (isLoading) return <Loader />;

  return (
    <div className="page">
      <PageHeader title="Teams">
        <Button icon="add" onClick={() => history.push(createRoute)}>{teams.length ? 'Add' : 'Create'} Team</Button>
      </PageHeader>
      <PageContent>
        {teams.length ? (
          teams.map((team) => <p key={team.teamId}>{team.name}</p>)
        ) : (
          <NoContent message="You haven't created any teams yet.">
            <Button icon="add" onClick={() => history.push(createRoute)}>Create Team</Button>
          </NoContent>
        )}
      </PageContent>
    </div>
  );
};


// <Button icon="insights">Create Track</Button>
// <Button icon="person">Add Member</Button>

