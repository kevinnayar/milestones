import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../Button/Button';
import { Grid, gridFormatterDateTime, GridHeader } from '../Grid/Grid';
import { NoContent } from '../NoContent/NoContent';
import { EntityTeam } from '../../../common/types/entityTypes';

export const TeamsList = (props: { teams: null | EntityTeam[] }) => {
  const history = useHistory();
  const headers: GridHeader[] = [
    ['name', 'Name', true],
    ['teamId', 'Team ID', false],
    ['description', 'Description', true],
    ['utcTimeCreated', 'Created on', true, gridFormatterDateTime],
    ['utcTimeUpdated', 'Updated on', true, gridFormatterDateTime],
  ];

  return (
    <>
      {props.teams && props.teams.length ? (
        <Grid headers={headers} rows={props.teams} linker={{ route: '/teams/', key: 'teamId' }} />
      ) : (
        <NoContent message="You haven't created any teams yet.">
          <Button icon="add" onClick={() => history.push('/teams/create')}>
            Create Team
          </Button>
        </NoContent>
      )}
    </>
  );
};
