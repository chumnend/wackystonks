import { Application } from 'express';
import { createServer, Server as HTTPServer } from 'http';
import { Server as SocketServer, Socket } from 'socket.io';
import { GameManager } from 'ws-assets';

import * as SocketEvent from './constants';

const wackyStonks = new GameManager();

const createSocketServer = (app: Application): HTTPServer => {
  const server = createServer(app);
  const io = new SocketServer(server, {
    cors: {
      origin: '*',
    },
  });

  io.on(SocketEvent.CONNECTION, (socket: Socket) => {
    console.log('client connected');

    socket.on(SocketEvent.CREATE_GAME, () => {
      const game = wackyStonks.createGame();

      socket.emit(SocketEvent.GAME_CREATED, {
        id: game.id,
      });

      game.subscribe(() => {
        socket.emit(SocketEvent.UPDATE_STONKS, {
          values: game.ticker.getStonks(),
        });
      });
      game.start();
    });

    socket.on(SocketEvent.DELETE_GAME, (recv) => {
      const { id } = recv;
      if (!wackyStonks.deleteGame(id)) {
        console.log('Something went wrong deleting game', id);
      }
    });

    socket.on(SocketEvent.DISCONNECT, () => {
      console.log('client disconnected');
    });
  });

  return server;
};

export default createSocketServer;
