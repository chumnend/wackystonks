import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import config, { sequelize } from './config';
import schema from './graphql';
import models from './models';
import { createUsers } from './models/seeds/users';

// initialize app
const app = express();
app.use(cors());

// initialize sequelize
(async () => {
  await sequelize.sync({
    force: config.eraseDatabaseOnSync,
    alter: config.alterDatabaseOnSync,
  });

  if (config.eraseDatabaseOnSync) {
    await createUsers();
  }
})();

// initialize appllo server
(async () => {
  const server = new ApolloServer({
    schema,
    context: async () => ({
      models,
      me: await models.User.findByLogin('chumnend'),
      secret: config.secret,
    }),
    formatError: (error) => {
      const message = error.message.replace('SequelizeValidationError: ', '').replace('Validation error: ', '');
      return {
        ...error,
        message,
      };
    },
  });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
})();

// start the application
app.listen(config.port, () => {
  console.log(`Server is listening on port ${config.port}`);
});
