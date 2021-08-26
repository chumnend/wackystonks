import { gql, useQuery } from '@apollo/client';

import Router from '../Router';

const GET_ME = gql`
  query {
    me {
      id
      email
      username
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(GET_ME);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const { username } = data.me;
  return (
    <div>
      <h1>Hello, {username ?? 'Stranger'}</h1>
      <Router />
    </div>
  );
};

export default App;
