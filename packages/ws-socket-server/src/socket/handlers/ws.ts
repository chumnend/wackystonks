import { GameType, Manager } from 'ws-core';
import { Server as SocketServer, Socket } from 'socket.io';

import { SocketEvents } from '../constants';

const WackyStonks = new Manager();
setInterval(() => {
  /* istanbul ignore next */
  WackyStonks.deleteEmptyGames();
}, 10000);

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
  /* istanbul ignore if */
  if (!cb) {
    return;
  }
  const game = WackyStonks.createGame();

  // setup event listener
  /* istanbul ignore next */
  game.listenForGameEvents(() => {
    io.in(game.id).emit(SocketEvents.GAME_UPDATE, game.gameState());
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
  /* istanbul ignore if */
  if (recv === undefined || !cb) {
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
  /* istanbul ignore if */
  if (recv === undefined || !cb) {
    return;
  }
  const { gameId, playerId, playerName } = recv;
  const game = WackyStonks.findGame(gameId);
  if (game) {
    game.addPlayer(playerId, playerName);
    socket.join(gameId);
    socket.to(gameId).emit(SocketEvents.GAME_UPDATE, game.gameState());
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
  /* istanbul ignore if */
  if (recv === undefined || !cb) {
    return;
  }
  const { gameId } = recv;
  const game = WackyStonks.findGame(gameId);
  if (game) {
    game.startGame();
    io.in(gameId).emit(SocketEvents.GAME_UPDATE, game.gameState());
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
  /* istanbul ignore if */
  if (recv === undefined || !cb) {
    return;
  }
  const { gameId, playerId } = recv;
  const game = WackyStonks.findGame(gameId);
  if (game) {
    /* istanbul ignore next */
    if (playerId === game.host) {
      socket.to(gameId).emit(SocketEvents.HOST_LEFT);
    }
    game.removePlayer(playerId);
    socket.to(gameId).emit(SocketEvents.GAME_UPDATE, game.gameState());
    socket.leave(gameId);
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
  /* istanbul ignore if */
  if (recv === undefined || !cb) {
    return;
  }
  const { gameId, playerId, symbol, amount } = recv;
  const game = WackyStonks.findGame(gameId);
  if (game) {
    game.buyStonk(playerId, symbol, amount);
    io.in(playerId).emit(SocketEvents.GAME_UPDATE, game.gameState());
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
  /* istanbul ignore if */
  if (recv === undefined || !cb) {
    return;
  }
  const { gameId, playerId, symbol, amount } = recv;
  const game = WackyStonks.findGame(gameId);
  if (game) {
    game.sellStonk(playerId, symbol, amount);
    io.in(playerId).emit(SocketEvents.GAME_UPDATE, game.gameState());
    cb(true);
  } else {
    // game does not exist
    cb(false);
  }
};
