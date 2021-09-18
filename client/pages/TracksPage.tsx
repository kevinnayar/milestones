import * as React from 'react';
import { useEffect } from 'react';
import { teamGetTeam } from '../store/reducers/team';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { ContentArea } from '../components/ContentArea/ContentArea';
import { hasFetchNotStarted } from '../../shared/utils/asyncUtils';
import { RootState } from '../store/store';

export const TracksPage = () => {
  const id = 'Tracks';
  return (
    <div id={`page-${id.toLowerCase()}`} className="page">
      <h1>{id}</h1>
      <ContentArea />
    </div>
  );
};

