import cors from 'cors';
import express from 'express';

import { initializeSequelize } from './sequelize';
import { initializeGQL } from './graphql';
import { createSocketServer } from './socket';

// initialize app
const app = express();

// configure middleware
app.use(cors());

// setup api routes
app.get('/status', (req, res) => {
  res.send('OK');
});

// initialize sequelize
(async () => await initializeSequelize())();

// initialize apollo server
(async () => await initializeGQL(app))();

// setup socket.io
const server = createSocketServer(app);

export default server;
