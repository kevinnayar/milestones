import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { BasePageTemplate } from '../../templates/BasePageTemplate';
import { getTrack, updateTrack } from '../../store/reducers/tracks';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { PageContent } from '../../components/PageContent/PageContent';
import { Loader } from '../../components/Loader/Loader';
import { TrackForm } from '../../components/Tracks/TrackForm';
import { TrackUpsertParams } from '../../../common/types/entityTypes';
import { PrivateComponentProps } from '../../routes';
import { hasFetchSucceeded } from '../../../common/utils/asyncUtils';
import { RootState } from '../../store/store';

export const TrackEditPage = ({ user: { userId }, match }: PrivateComponentProps) => {
  const { currentTrack } = useAppSelector((state: RootState) => state.tracks);

  const dispatch = useAppDispatch();
  const history = useHistory();
  const teamId = match?.params?.teamId;
  const trackId = match?.params?.trackId;

  const [isSaving, setIsSaving] = useState(false);

  const onSave = (body: TrackUpsertParams) => {
    dispatch(updateTrack({ userId, teamId, trackId, body }));
    setIsSaving(true);
  };

  const onCancel = () => {
    const pathname = history.location.pathname.replace('/edit', '');
    history.push(pathname);
  };

  useEffect(() => {
    if (teamId) {
      dispatch(getTrack({ userId, teamId, trackId }));
    }
  }, [dispatch, userId, teamId, trackId]);

  useEffect(() => {
    if (isSaving && hasFetchSucceeded(currentTrack) && currentTrack.data) {
      const pathname = history.location.pathname.replace('/edit', '');
      history.push(pathname);
    }
  }, [dispatch, history, isSaving, currentTrack]);

  if (currentTrack.data === null || isSaving) return <Loader />;

  return (
    <BasePageTemplate>
      <PageHeader title="Edit track" />
      <PageContent>
        <TrackForm teamId={teamId} track={currentTrack.data} onSave={onSave} onCancel={onCancel} />
      </PageContent>
    </BasePageTemplate>
  );
};
