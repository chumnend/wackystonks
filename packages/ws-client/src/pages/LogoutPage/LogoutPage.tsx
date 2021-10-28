import { useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';

import { Routes } from '../../constants';
import { useAuth } from '../../context/AuthProvider';

const LogoutPage = () => {
  const auth = useAuth();
  const authRef = useRef(auth);

  useEffect(() => {
    authRef.current?.clearToken();
  }, []);

  return <Redirect to={Routes.HOME_ROUTE} />;
};

export default LogoutPage;
