import * as React from 'react';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { PageContent } from '../components/PageContent/PageContent';
import { Button } from '../components/Button/Button';

export const TeamPage = () => {
  const id = 'Team';
  return (
    <div id={`page-${id.toLowerCase()}`} className="page">
      <PageHeader>
        <h1>{id}</h1>
        <Button icon="add">Add Member</Button>
      </PageHeader>
      <PageContent>
        <h2>Current Tracks</h2>
      </PageContent>
    </div>
  );
};
