import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { Ticker, Stonk } from 'ws-assets';

import config, { sequelize } from './config';
import schema from './graphql';
import models from './models';
import { createUsers } from './models/seeds/users';

// initialize app
const app = express();

// configure middleware
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

// initialize apollo server
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

// setup socketio
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const ticker = new Ticker('Demo Ticker');
const stonk = new Stonk('Test', 'TST', 27.03);

ticker.addStonk(stonk);

io.on('connection', (socket: Socket) => {
  console.log('client connected');
  socket.emit('status', 'Hello from socket.io');

  setInterval(() => {
    socket.emit('update', ticker.getStonks());
    ticker.simulate();
  }, 5000);

  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});

// start the application
server.listen(config.port, () => {
  console.log(`Server is listening on port ${config.port}`);
});
