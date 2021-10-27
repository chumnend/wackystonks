import Game from './Game';
import generateCode from './utils/generateCode';

export interface GameManagerMethods {
  /** Create a Game instance and store it in with GameManager instance */
  createGame: () => Game;
  /** Find a Game instance with the GameManager instance */
  findGame(id: string): Game | null;
  /** Remove a Game instance from GameManager instance */
  deleteGame(id: string): boolean;
}

class GameManager implements GameManagerMethods {
  private _gamesList: Game[];

  constructor() {
    this._gamesList = [];
  }

  createGame(): Game {
    let id = generateCode();

    /* istanbul ignore next */
    while (this.checkForGame(id)) {
      id = generateCode();
    }

    const game = new Game(id);
    this._gamesList.push(game);
    return game;
  }

  findGame(id: string): Game | null {
    const found = this._gamesList.find((g) => g.id === id);
    if (!found) {
      return null;
    }
    return found;
  }

  deleteGame(id: string): boolean {
    const exists = this.checkForGame(id);
    if (!exists) {
      return false;
    }

    this._gamesList = this._gamesList.filter((g) => g.id !== id);
    return true;
  }

  /**
   * Checks if game already exists with a passed id
   */
  private checkForGame(id: string): boolean {
    const found = this._gamesList.find((g) => g.id === id);
    return found ? true : false;
  }
}

export default GameManager;
