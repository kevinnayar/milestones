import * as React from 'react';
import { Link } from 'react-router-dom';

export const Branding = (props: { brand: string }) => {
  return (
    <h1 className="branding"><Link to="/teams">{props.brand}</Link></h1>
  );
};


