import * as React from 'react';

export const PageHeader = (props: { title: string, children?: any }) => {
  return (
    <div className="page-header">
      <h1>{props.title}</h1>
      {props.children}
    </div>
  );
};
