import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { PageContent } from '../components/PageContent/PageContent';
import { Button } from '../components/Button/Button';
import { Loader } from '../components/Loader/Loader';
import { NoContent } from '../components/NoContent/NoContent';

export const TeamCreatePage = () => {
  const history = useHistory();

  return (
    <div className="page">
      <PageHeader title="Create team" />
      <PageContent>
        <NoContent message="You haven't created any teams yet." />
      </PageContent>
    </div>
  );
};

// <Button icon="insights">Create Track</Button>
// <Button icon="person">Add Member</Button>
