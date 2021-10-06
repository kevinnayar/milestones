import * as React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getTeam } from '../../store/reducers/teams';
import { getTracks } from '../../store/reducers/tracks';
import { getMembers } from '../../store/reducers/members';
import { BasePageTemplate } from '../../templates/BasePageTemplate';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { PageContent } from '../../components/PageContent/PageContent';
import { Loader } from '../../components/Loader/Loader';
import { Button } from '../../components/Button/Button';
import { NoContent } from '../../components/NoContent/NoContent';
import { TeamForm } from '../../components/Teams/TeamForm';
import { TracksList } from '../../components/Tracks/TracksList';
import { MembersList } from '../../components/Members/MembersList';
import { PrivateComponentProps } from '../../routes';
import { RootState } from '../../store/store';

export const TeamInfoPage = ({ user: { userId }, match }: PrivateComponentProps) => {
  const { currentTeam } = useAppSelector((state: RootState) => state.teams);
  const { teamTracks } = useAppSelector((state: RootState) => state.tracks);
  const { teamMembers } = useAppSelector((state: RootState) => state.members);

  const dispatch = useAppDispatch();
  const history = useHistory();
  const teamId = match?.params?.teamId;

  useEffect(() => {
    if (teamId) {
      dispatch(getTeam({ userId, teamId }));
      dispatch(getTracks({ userId, teamId }));
      dispatch(getMembers({ userId, teamId }));
    }
  }, [dispatch, userId, teamId]);

  if (currentTeam.data === null) return <Loader />;

  return (
    <BasePageTemplate>
      <PageHeader title={currentTeam.data ? currentTeam.data.name : 'Team'}>
        {teamId && currentTeam.data && (
          <>
            <Button icon="edit" onClick={() => history.push(`/teams/${teamId}/edit`)}>
              Edit Team
            </Button>
            <Button icon="add" onClick={() => history.push(`/teams/${teamId}/tracks/create`)}>
              Add Track
            </Button>
          </>
        )}
      </PageHeader>
      <PageContent>
        {currentTeam.data ? (
          <>
            <div className="section">
              <h2>Details</h2>
              <TeamForm team={currentTeam.data} readOnly />
            </div>
            <div className="section">
              <h2>Tracks</h2>
              <TracksList tracks={teamTracks.data} />
            </div>
            <div className="section">
              <h2>Members</h2>
              <MembersList members={teamMembers.data} />
            </div>
          </>
        ) : (
          <NoContent message="This team doesn't exist.">
            <Button icon="add" onClick={() => history.push('/teams/create')}>
              Create a Team
            </Button>
          </NoContent>
        )}
      </PageContent>
    </BasePageTemplate>
  );
};
