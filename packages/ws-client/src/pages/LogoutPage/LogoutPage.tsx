import { useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';

import { HOME_ROUTE } from '../../constants/routes';
import { useAuth } from '../../providers/AuthProvider';

const LogoutPage = () => {
  const auth = useAuth();
  const authRef = useRef(auth);

  useEffect(() => {
    authRef.current?.clearToken();
  }, []);

  return <Redirect to={HOME_ROUTE} />;
};

export default LogoutPage;
