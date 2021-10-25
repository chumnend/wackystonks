import { ApolloServer } from 'apollo-server-express';
import { Application } from 'express';

import schema from './schemasMap';
import config from '../config';
import { models } from '../sequelize';

export const initializeGQL = async (app: Application): Promise<void> => {
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
};
