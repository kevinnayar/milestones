import * as React from 'react';
import { useTheme } from '../../hooks/useTheme';

export const Loader = () => {
  const { theme } = useTheme();
  return (
    <div className={`loader-overlay loader-overlay--${theme}`}>
      <div className="loader">
        <p>Loading...</p>
      </div>
    </div>
  );
};


