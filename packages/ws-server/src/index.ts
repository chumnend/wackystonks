import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import config from './config';
import schema from './graphql';

const app = express();
app.use(cors());

(async function startServer() {
  const server = new ApolloServer({
    schema,
  });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
})();

app.listen(config.port, () => {
  console.log(`Server is listening on port ${config.port}`);
});
