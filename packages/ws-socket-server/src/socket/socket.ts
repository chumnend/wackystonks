import { Application } from 'express';
import { createServer, Server as HTTPServer } from 'http';
import { Server as SocketServer, Socket } from 'socket.io';

import { SocketEvents } from './constants';
import { checkStatus, createGame } from './handlers';

const createSocketServer = (app: Application): HTTPServer => {
  const server = createServer(app);
  const io = new SocketServer(server, {
    cors: {
      origin: '*',
    },
  });

  io.on(SocketEvents.CONNECTION, (socket: Socket) => {
    /** Health check for testing */
    socket.on(SocketEvents.CHECK_STATUS, checkStatus);
    /** For hosts to create new game */
    socket.on(SocketEvents.CREATE_GAME, (cb) => createGame(io, cb));
  });

  return server;
};

export default createSocketServer;
