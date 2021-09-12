import * as React from 'react';
import { useState } from 'react';

type ComponentProps = {
  severity: 'error' | 'warning' | 'info' | 'success';
  children: any;
  dismissable?: boolean;
};

export const Alert = (props: ComponentProps) => {
  const [dismissed, setDismissed] = useState(false);
  const severity = props.severity === 'success'
    ? 'check_circle'
    : props.severity;

  if (dismissed) return null;

  return (
    <div className={`alert alert--${props.severity}`}>
      <i className="material-icons">{severity}</i>
      {props.children}
      {props.dismissable && (
        <i className="material-icons dismissable" onClick={() => setDismissed(true)}>
          cancel
        </i>
      )}
    </div>
  );
};




