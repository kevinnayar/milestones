import * as React from 'react';
import { Link } from 'react-router-dom';

export const Branding = (props: { brand: string }) => {
  return (
    <h1 className="branding"><Link to="/login">{props.brand}</Link></h1>
  );
};


