import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { BasePageTemplate } from '../../templates/BasePageTemplate';
import { getTeam, updateTeam } from '../../store/reducers/teams';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { PageContent } from '../../components/PageContent/PageContent';
import { Loader } from '../../components/Loader/Loader';
import { TeamForm } from '../../components/Forms/TeamForm';
import { TeamUpsertParams } from '../../../common/types/entityTypes';
import { PrivateComponentProps } from '../../app';
import { hasFetchSucceeded } from '../../../common/utils/asyncUtils';
import { RootState } from '../../store/store';

export const TeamEditPage = ({ user: { userId, token }, match }: PrivateComponentProps) => {
  const { currentTeam } = useAppSelector((state: RootState) => state.teams);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const teamId = match?.params?.teamId;
  const [isSaving, setIsSaving] = useState(false);

  const onSave = (params: TeamUpsertParams) => {
    const extra = {
      teamId,
      params,
    };
    dispatch(updateTeam({ userId, token, extra }));
    setIsSaving(true);
  };

  const onCancel = () => {
    const pathname = history.location.pathname.replace('/edit', '');
    history.push(pathname);
  };

  useEffect(() => {
    if (teamId) {
      const extra = { teamId };
      dispatch(getTeam({ userId, token, extra }));
    }
  }, [dispatch, token, userId, teamId]);

  useEffect(() => {
    if (isSaving && hasFetchSucceeded(currentTeam) && currentTeam.data && currentTeam.data.teamId) {
      const pathname = history.location.pathname.replace('/edit', '');
      history.push(pathname);
    }
  }, [dispatch, history, isSaving, currentTeam]);

  if (currentTeam.data === null || isSaving) return <Loader />;

  return (
    <BasePageTemplate>
      <div className="page">
        <PageHeader title="Update team" />
        <PageContent>
          <TeamForm team={currentTeam.data} onSave={onSave} onCancel={onCancel} />
        </PageContent>
      </div>
    </BasePageTemplate>
  );
};
