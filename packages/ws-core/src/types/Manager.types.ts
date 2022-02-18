import { IGame } from './';

export interface IManager {
  /** Creates a new game instance */
  createGame: () => IGame;
  /** Returns list of all active game instances */
  listGames(): IGame[];
  /** Find a game instance by id */
  findGame(id: string): IGame | null;
  /** Delete a game instance by id */
  deleteGame(id: string): boolean;
  /** Monitors all games and remove empty game instances */
  deleteEmptyGames(): void;
}
