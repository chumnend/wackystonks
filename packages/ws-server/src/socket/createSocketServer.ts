import { Application } from 'express';
import { createServer, Server as HTTPServer } from 'http';
import { Server as SocketServer, Socket } from 'socket.io';
import { Game } from 'ws-assets';

import * as SOCKET from './constants';

const createSocketServer = (app: Application): HTTPServer => {
  const server = createServer(app);
  const io = new SocketServer(server, {
    cors: {
      origin: '*',
    },
  });

  interface GameDetails {
    [key: string]: Game;
  }

  const gameDetails: GameDetails = {};

  io.on(SOCKET.ON_CONNECTION, (socket: Socket) => {
    console.log('client connected');

    socket.on(SOCKET.ON_CREATE_GAME, (recv) => {
      const { name } = recv;

      const game = new Game(name);
      game.subscribe(() => {
        socket.emit(SOCKET.EMIT_UPDATE, {
          values: game.ticker.getStonks(),
        });
      });

      game.start();
      gameDetails[name] = game;
    });

    socket.on(SOCKET.ON_DELETE_GAME, (recv) => {
      const { name } = recv;

      gameDetails[name].stop();
      delete gameDetails[name];
    });

    socket.on(SOCKET.ON_DISCONNECT, () => {
      console.log('client disconnected');
    });
  });

  return server;
};

export default createSocketServer;
