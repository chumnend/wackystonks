import { Manager } from 'ws-core';
import { Server as SocketServer } from 'socket.io';

import { SocketEvents } from '../constants';

const WackyStonks = new Manager();

export const createGame = (io: SocketServer, cb: (gameId: string) => void) => {
  if (!cb) {
    console.log(SocketEvents.CREATE_GAME, 'called without callback');
    return;
  }

  // create game
  const game = WackyStonks.createGame();

  // setup listener events
  game.listenForPrepEvent(() => {
    /* istanbul ignore next */
    io.in(game.id).emit(SocketEvents.STATUS_UPDATE, game.gameState());
  });

  game.listenForSimulationEvent(() => {
    /* istanbul ignore next */
    io.in(game.id).emit(SocketEvents.STONKS_UPDATE, game.gameState());
  });

  game.listenForTickEvent(() => {
    /* istanbul ignore next */
    io.in(game.id).emit(SocketEvents.TICK_UPDATE, game.gameState());
  });

  game.listenForGameEvent(() => {
    /* istanbul ignore next */
    io.in(game.id).emit(SocketEvents.STATUS_UPDATE, game.gameState());
  });
  cb(game.id);
};
