import React from 'react';

import SocketProvider from '../../providers/SocketProvider';

interface Props {
  children: React.ReactNode;
}

const AppProviders = ({ children }: Props) => {
  return <SocketProvider>{children}</SocketProvider>;
};

export default AppProviders;
