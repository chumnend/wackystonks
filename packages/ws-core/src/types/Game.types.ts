export type GameConfiguration = {
  tickTimerDelay: number;
  simulationDelay: number;
  prepTimerDelay: number;
  gameTimerDelay: number;
  initialFunds: number;
  numberOfStonks: number;
};

export interface IGame {
  /** An indentifier used to represent a game */
  id: string;
  /** Current status of the game */
  status: string;
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
  /** Set callback to trigger on clock tick event */
  listenForTickEvent(callback: () => void): boolean;
  /** Set callback to trigger on simulation event */
  listenForSimulationEvent(callback: () => void): boolean;
}
