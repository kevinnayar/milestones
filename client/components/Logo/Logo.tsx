import * as React from 'react';
import { ThemeType } from 'shared/helpers/ThemeHelper';

export const Logo = (props: { theme: ThemeType }) => {
  const colorBg = props.theme === 'dark' ? '#2196f3' : '#F7FAFC';
  const colorFg = props.theme === 'dark' ? '#F7FAFC' : '#2196f3';

  return (
    <svg width="48" height="48" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="24" fill={colorBg} />
      <polygon points="10 17 18 12 16 38" fill={colorFg} />
      <polygon points="19 17 27 12 25 38" fill={colorFg} />
      <polygon points="28 17 36 12 34 38" fill={colorFg} />
    </svg>
  );
};

