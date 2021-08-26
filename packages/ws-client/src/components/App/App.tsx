import { gql, useQuery } from '@apollo/client';

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
      <h1>Hello, {username}</h1>
    </div>
  );
};

export default App;
