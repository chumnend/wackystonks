import * as React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const cache = new InMemoryCache();
const uri = process.env.REACT_APP_GQL_SERVER_URI || 'http://localhost:8000';

console.log(uri);

export const client = new ApolloClient({ cache, uri });

interface Props {
  children: React.ReactNode;
}

const GQLProvider = ({ children }: Props) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default GQLProvider;
