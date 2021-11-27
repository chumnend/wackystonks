import React from 'react';

import GQLProvider from '../../providers/GQLProvider';
import AuthProvider from '../../providers/AuthProvider';
import SocketProvider from '../../providers/SocketProvider';

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
