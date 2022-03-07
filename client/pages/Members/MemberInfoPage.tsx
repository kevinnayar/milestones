import * as React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getMember } from '../../store/reducers/members';
import { BasePageTemplate } from '../../templates/BasePageTemplate';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { PageContent } from '../../components/PageContent/PageContent';
import { Loader } from '../../components/Loader/Loader';
import { Button } from '../../components/Button/Button';
import { NoContent } from '../../components/NoContent/NoContent';
import { MemberForm } from '../../components/Members/MemberForm';
import { PrivateComponentProps } from '../../routes';
import { RootState } from '../../store/store';

export const MemberInfoPage = ({ user: { userId }, match }: PrivateComponentProps) => {
  const { currentMember } = useAppSelector((state: RootState) => state.members);

  const dispatch = useAppDispatch();
  const history = useHistory();
  const teamId = match?.params?.teamId;
  const memberId = match?.params?.memberId;

  useEffect(() => {
    if (teamId && memberId) {
      dispatch(getMember({ userId, teamId, memberId }));
    }
  }, [dispatch, userId, teamId, memberId]);

  if (currentMember.data === null) return <Loader />;

  return (
    <BasePageTemplate>
      <PageHeader title={currentMember.data ? currentMember.data.displayName : 'Member'} />
      <PageContent>
        {currentMember.data ? (
          <>
            <div className="section">
              <h2>Details</h2>
              <MemberForm teamId={teamId} member={currentMember.data} readOnly />
            </div>
          </>
        ) : (
          <div className="section">
            <NoContent message="This member doesn't exist.">
              <Button
                icon="add"
                onClick={() => history.push(`${history.location.pathname}/members/create`)}
              >
                Add Member
              </Button>
            </NoContent>
          </div>
        )}
      </PageContent>
    </BasePageTemplate>
  );
};
