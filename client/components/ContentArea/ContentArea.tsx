import * as React from 'react';

export const ContentArea = (props: { children?: any }) => {
  return (
    <div className="content-area">
      {props.children}
    </div>
  );
};
