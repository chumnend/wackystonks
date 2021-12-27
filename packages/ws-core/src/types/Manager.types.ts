import { IGame } from './';

export interface IManager {
  /** Create a Game instance and store it in with GameManager instance */
  createGame: () => IGame;
  /** Find a Game instance with the GameManager instance */
  findGame(id: string): IGame | null;
  /** Remove a Game instance from GameManager instance */
  deleteGame(id: string): boolean;
}
