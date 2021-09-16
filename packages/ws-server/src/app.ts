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

// setup api routes
app.get('/status', (req, res) => {
  res.send('OK');
});

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

interface Game {
  ticker: Ticker;
  timer: ReturnType<typeof setInterval>;
}
interface GameDetails {
  [key: string]: Game;
}

const gameDetails: GameDetails = {};

io.on('connection', (socket: Socket) => {
  console.log('client connected');

  socket.on('create-game', (recv) => {
    console.log('creating game...');
    const { name } = recv;

    const ticker = new Ticker(name);
    const stonk = new Stonk('Test', 'TST', 27.03);
    ticker.addStonk(stonk);

    const timer = setInterval(() => {
      console.log('sending update');
      socket.emit('update', {
        values: ticker.getStonks(),
      });
      ticker.simulate();
    }, 3000);

    gameDetails[name] = { ticker, timer };
  });

  socket.on('delete-game', (recv) => {
    console.log('deleting game...');
    const { name } = recv;

    clearInterval(gameDetails[name].timer);
    delete gameDetails[name];
  });

  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});

export default server;
