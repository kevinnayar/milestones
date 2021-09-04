import * as React from 'react';

export const AppFooter = React.memo((props: { children: any }) => {
  return <footer className="app-footer">{props.children}</footer>;
});

export default React.memo(AppFooter);
