import React, { useState } from 'react';

const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const validateForm = (): boolean => {
    return login.length > 0 && password.length > 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
