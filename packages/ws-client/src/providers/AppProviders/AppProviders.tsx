import React from 'react';

import GQLProvider from '../GQLProvider';
import AuthProvider from '../AuthProvider';

interface Props {
  children: React.ReactNode;
}

const AppProviders = ({ children }: Props) => {
  return (
    <GQLProvider>
      <AuthProvider>{children}</AuthProvider>
    </GQLProvider>
  );
};

export default AppProviders;
