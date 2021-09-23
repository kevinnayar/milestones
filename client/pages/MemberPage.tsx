import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { PageContent } from '../components/PageContent/PageContent';
import { NoContent } from '../components/NoContent/NoContent';
import { PrivateComponentProps } from '../app';

export const MemberPage = ({ user: { userId, token } }: PrivateComponentProps) => {
  const history = useHistory();
  return (
    <div className="page">
      <PageHeader title="Member" />
      <PageContent />
    </div>
  );
};
