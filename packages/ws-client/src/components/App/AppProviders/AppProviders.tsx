import React from 'react';

import GQLProvider from '../../../context/GQLProvider';
import AuthProvider from '../../../context/AuthProvider';
import SocketProvider from '../../../context/SocketProvider';

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
