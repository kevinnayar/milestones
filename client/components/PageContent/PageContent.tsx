import * as React from 'react';

export const PageContent = (props: { children?: any }) => {
  return (
    <div className="page-content">
      {props.children}
    </div>
  );
};
