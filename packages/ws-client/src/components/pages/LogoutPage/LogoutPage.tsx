import { useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';

import { Routes } from '../../../helpers/constants';
import { useAuth } from '../../providers/AuthProvider';

const LogoutPage = () => {
  const auth = useAuth();
  const authRef = useRef(auth);

  useEffect(() => {
    authRef.current?.clearToken();
  }, []);

  return <Redirect to={Routes.HOME_ROUTE} />;
};

export default LogoutPage;
