import * as React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';


export const AuthLinks = () => {
  const location = useLocation();
  const history = useHistory();

  const routeMap = {
    '/login': 'Login',
    '/register': 'Signup',
  };
  const currentItem = routeMap[location.pathname];

  const onClick = (item: string) => {
    const found = Object.entries(routeMap).find(([, value]) => value === item);
    if (found) history.push(found[0]);
  };

  return (
    <div className="auth-links">
      <ButtonGroup items={Object.values(routeMap)} currentItem={currentItem} onClick={onClick} />
    </div>
  );
};
