import { gql, useLazyQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Loader from '../../components/Loader';
import { HOME_ROUTE } from '../../components/Router';
import { useAuth } from '../../providers/AuthProvider';

export const LOGIN_QUERY = gql`
  query LoginQuery($login: String!, $password: String!) {
    login(login: $login, password: $password) {
      token
    }
  }
`;

const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const history = useHistory();

  const [loginUser, { called, loading, error }] = useLazyQuery(LOGIN_QUERY, {
    variables: {
      login,
      password,
    },
    onCompleted: (data) => {
      const token = data?.login?.token;
      auth?.setToken(token);
      history.push(HOME_ROUTE);
    },
  });

  if (called && loading) return <Loader />;
  if (error) return <p>Error</p>;

  const validateForm = (): boolean => {
    return login.length > 0 && password.length > 0;
  };

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    loginUser({ variables: { login, password } });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login">Email or Username</label>
          <input id="login" type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button disabled={!validateForm()}>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
