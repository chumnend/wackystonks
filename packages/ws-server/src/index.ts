import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import { PORT } from './config/constants';
import schema from './graphql/schemasMap';
import pool from './config/database';

const app = express();

app.use(express.json());

pool.connect((err, client, done) => {
  if (err) {
    throw err;
  }
  console.log('Succesfully connected to db');
});

(async function startServer() {
  const server = new ApolloServer({ schema });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
})();

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
