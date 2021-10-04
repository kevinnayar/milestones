import * as React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { BasePageTemplate } from '../../templates/BasePageTemplate';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { PageContent } from '../../components/PageContent/PageContent';
import { createTrack, resetCreateTrack } from '../../store/reducers/tracks';
import { RootState } from '../../store/store';
import { PrivateComponentProps } from '../../routes';
import { TrackUpsertParams } from '../../../common/types/entityTypes';
import { hasFetchSucceeded } from '../../../common/utils/asyncUtils';
import { TrackForm } from '../../components/Tracks/TrackForm';

export const TrackCreatePage = ({ user: { userId }, match }: PrivateComponentProps) => {
  const { createdTrack } = useAppSelector((state: RootState) => state.tracks);

  const dispatch = useAppDispatch();
  const history = useHistory();
  const teamId = match?.params?.teamId;

  const onSave = (body: TrackUpsertParams) => {
    dispatch(createTrack({ userId, teamId, body }));
  };

  const onCancel = () => {
    const pathname = history.location.pathname.replace('/tracks/create', '');
    history.push(pathname);
  };

  useEffect(() => {
    dispatch(resetCreateTrack());
  }, [dispatch]);

  useEffect(() => {
    if (hasFetchSucceeded(createdTrack) && createdTrack.data && createdTrack.data.trackId) {
      const pathname = history.location.pathname.replace(
        '/create',
        `/${createdTrack.data.trackId}`,
      );
      history.push(pathname);
      dispatch(resetCreateTrack());
    }
  }, [dispatch, history, createdTrack]);

  return (
    <BasePageTemplate>
      <PageHeader title="Create track" />
      <PageContent>
        <TrackForm teamId={teamId} track={null} onSave={onSave} onCancel={onCancel} />
      </PageContent>
    </BasePageTemplate>
  );
};
