import * as React from 'react';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { PageContent } from '../components/PageContent/PageContent';
import { Button } from '../components/Button/Button';

export const TracksPage = () => {
  const id = 'Tracks';
  return (
    <div id={`page-${id.toLowerCase()}`} className="page">
      <PageHeader>
        <h1>{id}</h1>
        <Button icon="add">Create Track</Button>
      </PageHeader>
      <PageContent>
        <h2>Current Tracks</h2>
      </PageContent>
    </div>
  );
};

