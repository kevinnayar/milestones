import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../Button/Button';
import { Grid, gridFormatterDateTime, gridFormatterJson, GridHeader } from '../Grid/Grid';
import { NoContent } from '../NoContent/NoContent';
import { EntityTrack } from '../../../common/types/entityTypes';

export const TracksList = (props: { tracks: null | EntityTrack[] }) => {
  const history = useHistory();
  const headers: GridHeader[] = [
    ['name', 'Name', true],
    ['trackId', 'Track ID', false],
    ['description', 'Description', true],
    ['config', 'Configuration', true, gridFormatterJson],
    ['utcTimeCreated', 'Created on', true, gridFormatterDateTime],
    ['startDate', 'Started on', true, gridFormatterDateTime],
    ['utcTimeUpdated', 'Updated on', true, gridFormatterDateTime],
  ];

  return (
    <>
      {props.tracks && props.tracks.length ? (
        <Grid headers={headers} rows={props.tracks} linker={{ route: `${history.location.pathname}/tracks/`, key: 'trackId' }} />
      ) : (
        <NoContent message="You haven't added any tracks to this team yet.">
          <Button icon="add" onClick={() => history.push(`${history.location.pathname}/tracks/create`)}>
            Add Track
          </Button>
        </NoContent>
      )}
    </>
  );
};
