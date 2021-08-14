import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import config, { sequelize } from './config';
import schema from './graphql';
import models from './models';

const app = express();
app.use(cors());

(async () => {
  await sequelize.sync({ alter: config.env === 'development' });
})();

(async () => {
  const server = new ApolloServer({
    schema,
    context: async () => ({
      models,
      me: await models.User.findByLogin('chumnend'),
    }),
  });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
})();

app.listen(config.port, () => {
  console.log(`Server is listening on port ${config.port}`);
});
