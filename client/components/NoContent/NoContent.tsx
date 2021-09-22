import * as React from 'react';

export const NoContent = (props: { message: string, children?: any }) => {
  return (
    <div className="no-content">
      <p>{props.message}</p>
      {props.children}
    </div>
  );
};
