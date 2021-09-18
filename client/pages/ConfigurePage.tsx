import * as React from 'react';
import { ContentArea } from '../components/ContentArea/ContentArea';

export const ConfigurePage = () => {
  const id = 'Configure';
  return (
    <div id={`page-${id.toLowerCase()}`} className="page">
      <h1>{id}</h1>
      <ContentArea />
    </div>
  );
};
