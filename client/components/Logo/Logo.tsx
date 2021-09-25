import * as React from 'react';
import { Link } from 'react-router-dom';
import { ThemeType } from 'common/helpers/ThemeHelper';

export const Logo = (props: { theme: ThemeType }) => {
  const colorBg = props.theme === 'light' ? '#2196f3' : '#F7FAFC';
  const colorFg = props.theme === 'light' ? '#F7FAFC' : '#2196f3';

  return (
    <Link to="/login">
      <svg width="48" height="48" viewBox="-6 -6 60 60" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="24" fill={colorBg} />
        <polygon points="10 17 18 12 16 38" fill={colorFg} />
        <polygon points="19 17 27 12 25 38" fill={colorFg} />
        <polygon points="28 17 36 12 34 38" fill={colorFg} />
      </svg>
    </Link>
  );
};

