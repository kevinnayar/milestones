import * as React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getTrack, getTrackReduction } from '../../store/reducers/tracks';
import { BasePageTemplate } from '../../templates/BasePageTemplate';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { PageContent } from '../../components/PageContent/PageContent';
import { Loader } from '../../components/Loader/Loader';
import { Button } from '../../components/Button/Button';
import { NoContent } from '../../components/NoContent/NoContent';
import { TrackForm } from '../../components/Tracks/TrackForm';
import { TrackCalendar } from '../../components/Tracks/TrackCalendar';
import { PrivateComponentProps } from '../../routes';
import { RootState } from '../../store/store';

export const TrackInfoPage = ({ user: { userId }, match }: PrivateComponentProps) => {
  const { currentTrack, currentTrackReduction } = useAppSelector((state: RootState) => state.tracks);

  const dispatch = useAppDispatch();
  const history = useHistory();
  const teamId = match?.params?.teamId;
  const trackId = match?.params?.trackId;

  useEffect(() => {
    if (teamId && trackId) {
      dispatch(getTrack({ userId, teamId, trackId }));
      dispatch(getTrackReduction({ userId, teamId, trackId }));
    }
  }, [dispatch, userId, teamId, trackId]);

  if (currentTrack.data === null) return <Loader />;

  return (
    <BasePageTemplate>
      <PageHeader title={currentTrack.data ? currentTrack.data.name : 'Track'}>
        {teamId && trackId && currentTrack.data && (
          <>
            <Button
              icon="edit"
              onClick={() => history.push(`/teams/${teamId}/tracks/${trackId}/edit`)}
            >
              Edit Track
            </Button>
          </>
        )}
      </PageHeader>
      <PageContent>
        {currentTrack.data ? (
          <>
            <div className="section">
              <h2>Details</h2>
              <TrackForm teamId={teamId} track={currentTrack.data} readOnly />
            </div>
            {currentTrackReduction.data && (
              <div className="section">
                <h2>Calendar</h2>
                <TrackCalendar reduction={currentTrackReduction.data} />
              </div>
            )}
          </>
        ) : (
          <div className="section">
            <NoContent message="This track doesn't exist.">
              <Button
                icon="add"
                onClick={() => history.push(`${history.location.pathname}/tracks/create`)}
              >
                Add Track
              </Button>
            </NoContent>
          </div>
        )}
      </PageContent>
    </BasePageTemplate>
  );
};
