import React from 'react';

import GQLProvider from '../GQLProvider';
import AuthProvider from '../AuthProvider';
import SocketProvider from '../SocketProvider';
interface Props {
  children: React.ReactNode;
}

const AppProviders = ({ children }: Props) => {
  return (
    <GQLProvider>
      <SocketProvider>
        <AuthProvider>{children}</AuthProvider>
      </SocketProvider>
    </GQLProvider>
  );
};

export default AppProviders;
