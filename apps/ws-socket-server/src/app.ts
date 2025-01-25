import cors from 'cors';
import express from 'express';

import { createSocketServer } from './socket';

// initialize app
const app = express();

// configure middleware
app.use(cors());

// setup api routes
app.get('/status', (req, res) => {
  res.send('OK');
});

// setup socket.io
const server = createSocketServer(app);

export default server;
