import { Application } from 'express';
import { createServer, Server as HTTPServer } from 'http';
import { Server as SocketServer, Socket } from 'socket.io';

import { SocketEvents } from './constants';
import { checkStatus, createGame, findGame } from './handlers';

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
    /** For clients to find existing games */
    socket.on(SocketEvents.FIND_GAME, (recv, cb) => findGame(io, recv, cb));
    /** For clients to join a game */
    socket.on(SocketEvents.JOIN_GAME, () => null);
    /** Fot host to start a game */
    socket.on(SocketEvents.START_GAME, () => null);
    /** For clients to leave a game */
    socket.on(SocketEvents.LEAVE_GAME, () => null);
    /** For clients to buy stonk during game */
    socket.on(SocketEvents.BUY_STONK, () => null);
    /** For clients to sell stonks during running game */
    socket.on(SocketEvents.SELL_STONK, () => null);
  });

  return server;
};

export default createSocketServer;
