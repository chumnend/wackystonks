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
    /**
     * Called by client when a host creates a new game.
     */
    socket.on(SocketEvents.CREATE_GAME, (_, cb) => {
      if (!cb) {
        console.log(SocketEvents.CREATE_GAME, 'called without callback');
        return;
      }

      const game = wackyStonks.createGame();
      game.addPlayer(socket.id, 'Player' + socket.id.slice(0, 4));
      game.subscribe(() => {
        socket.emit(SocketEvents.UPDATE_STONKS, {
          values: game.ticker.getStonks(),
        });
      });
      game.start();
      cb(game.id);
    });

    /**
     * Called by client to get the game state of a desired game.
     */
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
      cb(game?.getGameState());
    });

    /**
     * Called by client when a new player wishes to enter a game lobby.
     */
    socket.on(SocketEvents.JOIN_GAME, () => {
      console.log('NOT YET IMPLMENTED');
    });

    /**
     * Called by client when player leaves a game.
     */
    socket.on(SocketEvents.LEAVE_GAME, (recv, cb) => {
      const { id } = recv;

      if (!id) {
        console.log(SocketEvents.FIND_GAME, 'called without id');
        return;
      }

      if (!cb) {
        console.log(SocketEvents.CREATE_GAME, 'called without callback');
        return;
      }

      const game = wackyStonks.findGame(id);
      if (game) {
        game.removePlayer(socket.id);
        if (game.players.length == 0) {
          wackyStonks.deleteGame(id);
        }
      }
      cb();
    });

    /**
     * Called by client when player is changing thier name.
     */
    socket.on(SocketEvents.RENAME_PLAYER, () => {
      console.log('NOT YET IMPLMENTED');
    });

    /**
     * Called by client when host wishes to end the game room.
     */
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
  });

  return server;
};

export default createSocketServer;
