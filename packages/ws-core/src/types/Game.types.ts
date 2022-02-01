import { IPlayer, IStonk, PortfolioType } from './';

export type ConfigurationType = {
  tickTimerDelay: number;
  simulationDelay: number;
  prepTimerDelay: number;
  gameTimerDelay: number;
  initialFunds: number;
  numberOfStonks: number;
};

export type PlayerType = {
  id: string;
  name: string;
  portfolio: PortfolioType;
  funds: number;
  netValue: number;
};

export type StonkType = {
  name: string;
  symbol: string;
  price: number;
  previousPrices: number[];
};

export type GameType = {
  id: string;
  status: string;
  players: PlayerType[];
  stonks: StonkType[];
  timeLeft: number;
};

export interface IGame {
  /** An indentifier used to represent a game */
  id: string;
  /** Current status of the game */
  status: string;
  /** An array of players in a game */
  players: IPlayer[];
  /** An array of stonks in a game */
  stonks: IStonk[];
  /** Returns game information */
  gameState(): GameType;
  /** Starts the game */
  startGame(): void;
  /** Stops the game */
  stopGame(): void;
  /** Add a new player to the game */
  addPlayer(id: string, name: string): boolean;
  /** Remove an existing player */
  removePlayer(id: string): boolean;
  /** Initiate stonk purchase for a player */
  buyStonk(playerId: string, symbol: string, amount: number): boolean;
  /** Initiate stonk sell for a player */
  sellStonk(playerId: string, symbol: string, amount: number): boolean;
  /** Set callback to trigger on game events */
  listenForGameEvents(callback: () => void);
}
