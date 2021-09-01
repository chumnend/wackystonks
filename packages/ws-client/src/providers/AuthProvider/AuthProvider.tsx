import React, { createContext, useCallback, useContext, useState } from 'react';

interface IAuthContext {
  token: string;
  isAuth: boolean;

  setToken(token: string): void;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuth = () => useContext(AuthContext);

interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [state, setState] = useState({
    token: '',
  });

  const setToken = useCallback((token: string) => {
    setState((state) => ({
      ...state,
      token,
    }));
  }, []);

  const values = {
    ...state,
    isAuth: state.token.length > 0,
    setToken,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
