import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../Button/Button';
import { Grid, gridFormatterDateTime, gridFormatterBoolean, GridHeader } from '../Grid/Grid';
import { NoContent } from '../NoContent/NoContent';
import { TeamMember } from '../../../common/types/entityTypes';

export const MembersList = (props: { members: null | TeamMember[] }) => {
  const history = useHistory();
  const headers: GridHeader[] = [
    ['displayName', 'Name', true],
    ['isOwner', 'Team Admin', true, gridFormatterBoolean],
    ['userId', 'User ID', false],
    ['utcTimeCreated', 'Joined on', true, gridFormatterDateTime],
  ];

  return (
    <>
      {props.members && props.members.length ? (
        <Grid
          headers={headers}
          rows={props.members}
          linker={{ route: `${history.location.pathname}/members/`, key: 'userId' }}
        />
      ) : (
        <NoContent message="You haven't added any members to this team yet.">
          <Button
            icon="add"
            onClick={() => history.push(`${history.location.pathname}/members/create`)}
          >
            Add Track
          </Button>
        </NoContent>
      )}
    </>
  );
};
