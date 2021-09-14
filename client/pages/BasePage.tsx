import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { getTeam } from '../store/reducers/team';
import { RootState } from '../store/store';
import { formatError } from '../../shared/utils/baseUtils';

export const BasePage = () => {
  const [error, setError] = useState('');
  const { teamXfer, team } = useAppSelector((state: RootState) => state.team);
  const dispatch = useAppDispatch();

  const onGetTeam = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log('clicked');

    try {
      dispatch(getTeam());
    } catch (e) {
      setError(formatError(e));
    }
  };



  return (
    <div className="">
      {team && <pre>{JSON.stringify(team, null, 2)}</pre>}
      <form onSubmit={onGetTeam}>
        <button type="submit">
          get team
        </button>
      </form>
    </div>
  );
};
