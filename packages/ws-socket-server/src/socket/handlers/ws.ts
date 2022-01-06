import { GameType, Manager } from 'ws-core';
import { Server as SocketServer, Socket } from 'socket.io';

import { SocketEvents } from '../constants';

const WackyStonks = new Manager();

/**
 * Creates a new Wacky Stonks game instance
 * @param io {ServerSocket} Socket server instance
 * @param socket {Socket} The client's socket instance
 * @param recv the arguments expected from the client
 * @param cb  the callback function to call on end
 */
export const createGame = (
  io: SocketServer,
  socket: Socket,
  recv: Record<string, never>,
  cb: (gameId: string) => void,
): void => {
  if (!cb) {
    /* istanbul ignore next */
    return;
  }
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

/**
 * Looks for a game by game id
 * @param io {ServerSocket} Socket server instance
 * @param socket {Socket} The client's socket instance
 * @param recv the arguments expected from the client
 * @param cb  the callback function to call on end
 */
export const findGame = (
  io: SocketServer,
  socket: Socket,
  recv: { gameId: string },
  cb: (state: GameType) => void,
): void => {
  if (recv === undefined || !cb) {
    /* istanbul ignore next */
    return;
  }
  const { gameId } = recv;
  const game = WackyStonks.findGame(gameId);
  cb(game?.gameState());
};

/**
 * Adds a player to an existing game
 * @param io {ServerSocket} Socket server instance
 * @param socket {Socket} The client's socket instance
 * @param recv the arguments expected from the client
 * @param cb  the callback function to call on end
 */
export const joinGame = (
  io: SocketServer,
  socket: Socket,
  recv: {
    gameId: string;
    playerId: string;
    playerName: string;
  },
  cb: (state: GameType) => void,
): void => {
  if (recv === undefined || !cb) {
    /* istanbul ignore next */
    return;
  }
  const { gameId, playerId, playerName } = recv;
  const game = WackyStonks.findGame(gameId);
  if (game) {
    game.addPlayer(playerId, playerName);
    socket.join(gameId);
    socket.to(gameId).emit(SocketEvents.PLAYERS_UPDATE, game.gameState());
  }
  cb(game?.gameState());
};

/**
 * Starts a game instance if it exists
 * @param io {ServerSocket} Socket server instance
 * @param socket {Socket} The client's socket instance
 * @param recv the arguments expected from the client
 * @param cb  the callback function to call on end
 */
export const startGame = (
  io: SocketServer,
  socket: Socket,
  recv: {
    gameId: string;
  },
  cb: (success: boolean) => void,
): void => {
  if (recv === undefined || !cb) {
    /* istanbul ignore next */
    return;
  }
  const { gameId } = recv;
  const game = WackyStonks.findGame(gameId);
  if (game) {
    game.startGame();
    io.in(gameId).emit(SocketEvents.STATUS_UPDATE, game.gameState());
    cb(true);
  } else {
    // game does not exist
    cb(false);
  }
};

/**
 * Leave a game instance if it exists
 * @param io {ServerSocket} Socket server instance
 * @param socket {Socket} The client's socket instance
 * @param recv the arguments expected from the client
 * @param cb  the callback function to call on end
 */
export const leaveGame = (
  io: SocketServer,
  socket: Socket,
  recv: {
    gameId: string;
    playerId: string;
  },
  cb: (success: boolean) => void,
): void => {
  if (recv === undefined || !cb) {
    /* istanbul ignore next */
    return;
  }
  const { gameId, playerId } = recv;
  const game = WackyStonks.findGame(gameId);
  if (game) {
    game.removePlayer(playerId);
    socket.leave(playerId);
    socket.to(playerId).emit(SocketEvents.PLAYERS_UPDATE, game.gameState());
    cb(true);
  } else {
    // game does not exist
    cb(false);
  }
};

/**
 * Buy a stonk
 * @param io {ServerSocket} Socket server instance
 * @param socket {Socket} The client's socket instance
 * @param recv the arguments expected from the client
 * @param cb  the callback function to call on end
 */
export const buyStonks = (
  io: SocketServer,
  socket: Socket,
  recv: {
    gameId: string;
    playerId: string;
    symbol: string;
    amount: number;
  },
  cb: (success: boolean) => void,
): void => {
  if (recv === undefined || !cb) {
    /* istanbul ignore next */
    return;
  }
  const { gameId, playerId, symbol, amount } = recv;
  const game = WackyStonks.findGame(gameId);
  if (game) {
    game.buyStonk(playerId, symbol, amount);
    io.in(playerId).emit(SocketEvents.PLAYERS_UPDATE, game.gameState());
    cb(true);
  } else {
    // game does not exist
    cb(false);
  }
};

/**
 * Sell a stonk
 * @param io {ServerSocket} Socket server instance
 * @param socket {Socket} The client's socket instance
 * @param recv the arguments expected from the client
 * @param cb  the callback function to call on end
 */
export const sellStonks = (
  io: SocketServer,
  socket: Socket,
  recv: {
    gameId: string;
    playerId: string;
    symbol: string;
    amount: number;
  },
  cb: (success: boolean) => void,
): void => {
  if (recv === undefined || !cb) {
    /* istanbul ignore next */
    return;
  }
  const { gameId, playerId, symbol, amount } = recv;
  const game = WackyStonks.findGame(gameId);
  if (game) {
    game.sellStonk(playerId, symbol, amount);
    socket.to(playerId).emit(SocketEvents.PLAYERS_UPDATE, game.gameState());
    cb(true);
  } else {
    // game does not exist
    cb(false);
  }
};
