import { Application } from 'express';
import { createServer, Server as HTTPServer } from 'http';
import { Server as SocketServer, Socket } from 'socket.io';

import { SocketEvents } from './constants';
import { checkStatus } from './handlers';

const createSocketServer = (app: Application): HTTPServer => {
  const server = createServer(app);
  const io = new SocketServer(server, {
    cors: {
      origin: '*',
    },
  });

  io.on(SocketEvents.CONNECTION, (socket: Socket) => {
    socket.on(SocketEvents.STATUS_CHECK, checkStatus);
  });

  return server;
};

export default createSocketServer;
