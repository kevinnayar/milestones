import * as React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { BasePageTemplate } from '../../templates/BasePageTemplate';
import { createTeam, resetCreateTeam } from '../../store/reducers/teams';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { PageContent } from '../../components/PageContent/PageContent';
import { PrivateComponentProps } from '../../routes';
import { TeamUpsertParams } from '../../../common/types/entityTypes';
import { hasFetchSucceeded } from '../../../common/utils/asyncUtils';
import { RootState } from '../../store/store';
import { TeamForm } from '../../components/Teams/TeamForm';

export const TeamCreatePage = ({ user: { userId } }: PrivateComponentProps) => {
  const { createdTeam } = useAppSelector((state: RootState) => state.teams);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const onSave = (params: TeamUpsertParams) => {
    dispatch(createTeam({ userId, params }));
  };

  const onCancel = () => {
    const pathname = history.location.pathname.replace('/create', '');
    history.push(pathname);
  };

  useEffect(() => {
    dispatch(resetCreateTeam());
  }, [dispatch]);

  useEffect(() => {
    if (hasFetchSucceeded(createdTeam) && createdTeam.data && createdTeam.data.teamId) {
      const pathname = history.location.pathname.replace('/create', `/${createdTeam.data.teamId}`);
      history.push(pathname);
      dispatch(resetCreateTeam());
    }
  }, [dispatch, history, createdTeam]);

  return (
    <BasePageTemplate>
      <PageHeader title="Create team" />
      <PageContent>
        <TeamForm team={null} onSave={onSave} onCancel={onCancel} />
      </PageContent>
    </BasePageTemplate>
  );
};

