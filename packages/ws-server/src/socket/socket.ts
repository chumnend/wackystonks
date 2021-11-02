import { Application } from 'express';
import { createServer, Server as HTTPServer } from 'http';
import { Server as SocketServer, Socket } from 'socket.io';
import { GameManager } from 'ws-assets';

import * as SocketEvents from './socketEvents';

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
     * Called by client when a host creates a new game. Sends game id in callback.
     */
    socket.on(SocketEvents.CREATE_GAME, (_, cb) => {
      if (!cb) {
        console.log(SocketEvents.CREATE_GAME, 'called without callback');
        return;
      }

      const game = wackyStonks.createGame();
      cb(game.id);
    });

    /**
     * Called by client to get the game state of a desired game. Should recieve game id. Returns game state or null.
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
     * Called by client when a new player wishes to enter a game lobby. Should recieve game id. Sends game state or null.
     */
    socket.on(SocketEvents.JOIN_GAME, (recv, cb) => {
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
      if (game) {
        game.addPlayer(socket.id, 'Player-' + socket.id.slice(0, 4));
        socket.join(id);
        socket.to(id).emit(SocketEvents.PLAYERS_UPDATE, { gameState: game.getGameState() });
      }
      cb(game?.getGameState());
    });

    /**
     * Called by client when player leaves a game. Should recieve game id.
     */
    socket.on(SocketEvents.LEAVE_GAME, (recv) => {
      const { id } = recv;

      if (!id) {
        console.log(SocketEvents.FIND_GAME, 'called without id');
        return;
      }

      const game = wackyStonks.findGame(id);
      if (game) {
        game.removePlayer(socket.id);
        socket.leave(id);
        socket.to(id).emit(SocketEvents.PLAYERS_UPDATE, { gameState: game.getGameState() });

        if (game.players.length == 0) {
          wackyStonks.deleteGame(id);
        }
      }
    });

    /**
     * Called by client when player is changing thier name.
     */
    socket.on(SocketEvents.RENAME_PLAYER, () => {
      console.log('NOT YET IMPLMENTED');
    });

    /**
     * Called by client when host wishes to end the game room. Should recieve game id.
     */
    socket.on(SocketEvents.DELETE_GAME, (recv) => {
      const { id } = recv;
      if (!id) {
        console.log(SocketEvents.DELETE_GAME, 'called without id');
        return;
      }

      if (!wackyStonks.deleteGame(id)) {
        console.log('Something went wrong deleting game', id);
        return;
      }

      socket.to(id).emit(SocketEvents.GAME_ENDED);
      io.in(id).socketsLeave(id);
    });
  });

  return server;
};

export default createSocketServer;
