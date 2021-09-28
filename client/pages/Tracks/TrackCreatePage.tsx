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
import { PrivateComponentProps } from '../../app';
import { TrackCreateParams } from '../../../common/types/entityTypes';
import { hasFetchSucceeded } from '../../../common/utils/asyncUtils';
import { TrackForm } from '../../components/Forms/TrackForm';

export const TrackCreatePage = ({ user: { userId, token }, match }: PrivateComponentProps) => {
  const { createdTrack } = useAppSelector((state: RootState) => state.tracks);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const teamId = match?.params?.teamId;

  const onSave = (extra: TrackCreateParams) => {
    dispatch(createTrack({ userId, token, extra }));
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
      <div className="page">
        <PageHeader title="Create track" />
        <PageContent>
          <TrackForm teamId={teamId} track={null} onSave={onSave} onCancel={onCancel} />
        </PageContent>
      </div>
    </BasePageTemplate>
  );
};
