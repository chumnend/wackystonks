import { Application } from 'express';
import { createServer, Server as HTTPServer } from 'http';
import { Server as SocketServer, Socket } from 'socket.io';
import { GameManager } from 'ws-assets';

import * as SocketEvents from './constants';

const wackyStonks = new GameManager();

const createSocketServer = (app: Application): HTTPServer => {
  const server = createServer(app);
  const io = new SocketServer(server, {
    cors: {
      origin: '*',
    },
  });

  io.on(SocketEvents.CONNECTION, (socket: Socket) => {
    console.log('client connected');

    socket.on(SocketEvents.CREATE_GAME, (_, cb) => {
      if (!cb) {
        console.log(SocketEvents.CREATE_GAME, 'called without callback');
        return;
      }

      const game = wackyStonks.createGame();
      game.subscribe(() => {
        socket.emit(SocketEvents.UPDATE_STONKS, {
          values: game.ticker.getStonks(),
        });
      });
      game.start();
      cb(game.id);
    });

    socket.on(SocketEvents.FIND_GAME, (recv, cb) => {
      const { id } = recv;

      if (!id) {
        console.log(SocketEvents.FIND_GAME, 'called without id');
        return;
      }

      if (!cb) {
        console.log(SocketEvents.FIND_GAME, 'called without callback');
        return;
      }

      const game = wackyStonks.findGame(id);
      cb(game.id);
    });

    socket.on(SocketEvents.DELETE_GAME, (recv) => {
      const { id } = recv;
      if (!id) {
        console.log(SocketEvents.DELETE_GAME, 'called without id');
        return;
      }

      if (!wackyStonks.deleteGame(id)) {
        console.log('Something went wrong deleting game', id);
      }
    });

    socket.on(SocketEvents.DISCONNECT, () => {
      console.log('client disconnected');
    });
  });

  return server;
};

export default createSocketServer;
