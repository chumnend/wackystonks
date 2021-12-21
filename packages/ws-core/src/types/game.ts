export type GameConfiguration = {
  tickTimerDelay: number;
  prepTimerDelay: number;
  gameTimerDelay: number;
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
  subscribeToTick(callback: () => void): void;
}
