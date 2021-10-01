import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { BasePageTemplate } from '../../templates/BasePageTemplate';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { PageContent } from '../../components/PageContent/PageContent';
import { NoContent } from '../../components/NoContent/NoContent';
import { PrivateComponentProps } from '../../routes';

export const MemberCreatePage = ({ user: { userId, token } }: PrivateComponentProps) => {
  const history = useHistory();
  return (
    <BasePageTemplate>
      <PageHeader title="Create member" />
      <PageContent />
    </BasePageTemplate>
  );
};
