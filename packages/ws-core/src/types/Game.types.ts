export type GameConfiguration = {
  tickTimerDelay: number;
  prepTimerDelay: number;
  gameTimerDelay: number;
  initialFunds: number;
};

export interface IGame {
  /** An indentifier used to represent a game */
  id: string;
  /** Current status of the game */
  status: string;
  /** Starts the game */
  start(): void;
  /** Stops the game */
  stop(): void;
  /** Set callback to trigger on clock tick */
  subscribeToTick(callback: () => void): boolean;
  /** Add a new player to the game */
  addPlayer(id: string, name: string): boolean;
  /** Remove an existing player */
  removePlayer(id: string): boolean;
}
