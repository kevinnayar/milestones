import * as React from 'react';

export const PageHeader = (props: { children?: any }) => {
  return (
    <div className="page-header">
      {props.children}
    </div>
  );
};
