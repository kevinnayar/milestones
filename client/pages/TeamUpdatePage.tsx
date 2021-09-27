import * as React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { BasePageTemplate } from '../templates/BasePageTemplate';
import { getTeam, createTeam } from '../store/reducers/teams';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { PageContent } from '../components/PageContent/PageContent';
import { Loader } from '../components/Loader/Loader';
import { TeamForm } from '../components/Forms/TeamForm';
import { TeamUpsertParams } from '../../common/types/entityTypes';
import { PrivateComponentProps } from '../app';
import { RootState } from '../store/store';

export const TeamUpdatePage = ({ user: { userId, token }, match }: PrivateComponentProps) => {
  const { currentTeam } = useAppSelector((state: RootState) => state.teams);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const teamId = match?.params?.teamId;

  const onUpdate = (extra: TeamUpsertParams) => {
    dispatch(createTeam({ userId, token, extra }));
  };

  useEffect(() => {
    if (teamId) {
      const extra = { teamId };
      dispatch(getTeam({ userId, token, extra }));
    }
  }, [dispatch, token, userId, teamId]);

  useEffect(() => {
    if (teamId) {
      const extra = { teamId };
      dispatch(getTeam({ userId, token, extra }));
    }
  }, [dispatch, token, userId, teamId]);

  if (currentTeam.data === null) return <Loader />;

  return (
    <BasePageTemplate>
      <div className="page">
        <PageHeader title="Update team" />
        <PageContent>
          <TeamForm team={currentTeam.data} onSave={onUpdate} />
        </PageContent>
      </div>
    </BasePageTemplate>
  );
};
