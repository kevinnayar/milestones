import * as React from 'react';

export const AppHeader = React.memo((props: { children: any }) => {
  return <header className="app-header">{props.children}</header>;
});
