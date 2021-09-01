import { gql, useQuery } from '@apollo/client';

import Loader from '../Loader';
import Router from '../Router';

const GET_ME_QUERY = gql`
  query getMe {
    me {
      id
      email
      username
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(GET_ME_QUERY);

  if (loading) return <Loader />;
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
