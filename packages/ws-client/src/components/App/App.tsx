import { gql, useQuery } from '@apollo/client';

import Router from '../Router';
import Loader from '../Loader';

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
  if (error) {
    console.log('unable to connect to gql server');
  }

  console.log(data);

  return (
    <>
      <Router />
    </>
  );
};

export default App;
