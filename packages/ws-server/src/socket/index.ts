import { Application } from 'express';
import { createServer, Server as HTTPServer } from 'http';
import { Server as SocketServer, Socket } from 'socket.io';
import { Game } from 'ws-assets';

export const createSocketServer = (app: Application): HTTPServer => {
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

  io.on('connection', (socket: Socket) => {
    console.log('client connected');

    socket.on('create-game', (recv) => {
      console.log('creating game...');
      const { name } = recv;

      const game = new Game(name);
      game.subscribe(() => {
        console.log('sending update');
        socket.emit('update', {
          values: game.ticker.getStonks(),
        });
      });

      game.start();
      gameDetails[name] = game;
    });

    socket.on('delete-game', (recv) => {
      console.log('deleting game...');
      const { name } = recv;

      gameDetails[name].stop();
      delete gameDetails[name];
    });

    socket.on('disconnect', () => {
      console.log('client disconnected');
    });
  });

  return server;
};
