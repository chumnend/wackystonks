import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';

import Loader from '../Loader';
import Router from '../Router';
import { socket } from '../../socket';

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

  useEffect(() => {
    socket.on('status', (msg) => {
      console.log(msg);
    });

    socket.on('update', (obj) => {
      console.log(obj);
    });
  }, []);

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
