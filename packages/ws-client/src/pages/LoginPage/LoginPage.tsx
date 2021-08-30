import React, { useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';

import Loader from '../../components/Loader';

const LOGIN_QUERY = gql`
  query LoginQuery($login: String!, $password: String!) {
    login(login: $login, password: $password) {
      token
    }
  }
`;

const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [loginUser, { loading, error, data }] = useLazyQuery(LOGIN_QUERY, {
    variables: {
      login,
      password,
    },
  });

  const validateForm = (): boolean => {
    return login.length > 0 && password.length > 0;
  };

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    loginUser({ variables: { login, password } });
  };

  if (loading) return <Loader />;
  if (error) return <p>Error</p>;

  if (data) {
    console.log(data);
  }

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
