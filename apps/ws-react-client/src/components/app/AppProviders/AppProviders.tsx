import React from 'react';

import SocketProvider from '../../providers/SocketProvider';
import ToastProvider from '../../providers/ToastProvider';

interface Props {
  children: React.ReactNode;
}

const AppProviders = ({ children }: Props) => {
  return (
    <SocketProvider>
      <ToastProvider>{children}</ToastProvider>
    </SocketProvider>
  );
};

export default AppProviders;
