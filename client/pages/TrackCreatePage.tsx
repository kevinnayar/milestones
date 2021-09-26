import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { BasePageTemplate } from '../templates/BasePageTemplate';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { PageContent } from '../components/PageContent/PageContent';
import { NoContent } from '../components/NoContent/NoContent';
import { PrivateComponentProps } from '../app';

export const TrackCreatePage = ({ user: { userId, token } }: PrivateComponentProps) => {
  const history = useHistory();
  return (
    <BasePageTemplate>
      <div className="page">
        <PageHeader title="Create track" />
        <PageContent />
      </div>
    </BasePageTemplate>
  );
};
