import { Application } from 'express';
import { createServer, Server as HTTPServer } from 'http';
import { Server as SocketServer, Socket } from 'socket.io';

import { SocketEvents } from './constants';
import { defaultHandlers, wackyStonksHandlers } from './handlers';

const createSocketServer = (app: Application): HTTPServer => {
  const server = createServer(app);
  const io = new SocketServer(server, {
    cors: {
      origin: '*',
    },
  });

  io.on(SocketEvents.CONNECTION, (socket: Socket) => {
    /** Health check for testing */
    socket.on(SocketEvents.CHECK_STATUS, defaultHandlers.checkStatus);
    /** For hosts to create new game */
    socket.on(SocketEvents.CREATE_GAME, (recv, cb) => wackyStonksHandlers.createGame(io, socket, recv, cb));
    /** For clients to find existing games */
    socket.on(SocketEvents.FIND_GAME, (recv, cb) => wackyStonksHandlers.findGame(io, socket, recv, cb));
    /** For clients to join a game */
    socket.on(SocketEvents.JOIN_GAME, (recv, cb) => wackyStonksHandlers.joinGame(io, socket, recv, cb));
    /** Fot host to start a game */
    socket.on(SocketEvents.START_GAME, (recv, cb) => wackyStonksHandlers.startGame(io, socket, recv, cb));
    /** For clients to leave a game */
    socket.on(SocketEvents.LEAVE_GAME, (recv, cb) => wackyStonksHandlers.leaveGame(io, socket, recv, cb));
    /** For clients to buy stonk during game */
    socket.on(SocketEvents.BUY_STONK, (recv, cb) => wackyStonksHandlers.buyStonks(io, socket, recv, cb));
    /** For clients to sell stonks during running game */
    socket.on(SocketEvents.SELL_STONK, (recv, cb) => wackyStonksHandlers.sellStonks(io, socket, recv, cb));
  });

  return server;
};

export default createSocketServer;
