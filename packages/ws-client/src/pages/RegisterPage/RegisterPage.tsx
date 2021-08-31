import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

import Loader from '../../components/Loader';

export const REGISTER_MUTATION = gql`
  mutation RegisterMutation($email: String!, $username: String!, $password: String!) {
    register(email: $email, username: $username, password: $password) {
      token
    }
  }
`;

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [registerUser, { loading, error, data }] = useMutation(REGISTER_MUTATION);

  const validateForm = (): boolean => {
    return email.length > 0 && username.length > 0 && password.length > 0;
  };

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    registerUser({ variables: { email, username, password } });
  };

  if (loading) return <Loader />;
  if (error) return <p>Error</p>;

  if (data) {
    console.log(data?.register?.token);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button disabled={!validateForm()}>Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
