import Game from './Game';
import generateCode from './utils/generateCode';

interface GameManagerMethods {
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

  /**
   * Create new game
   * @returns {Game}
   */
  createGame(): Game {
    let id = generateCode();

    /* istanbul ignore next */
    while (this._gamesList.find((g) => g.id === id)) {
      id = generateCode();
    }

    const game = new Game(id);
    this._gamesList.push(game);
    return game;
  }

  /**
   * Search game list for a game by id
   * @param id {string} Identifier of game to find
   * @returns {Game | null}
   */
  findGame(id: string): Game | null {
    const game = this._gamesList.find((g) => g.id === id);
    if (!game) {
      return null;
    }
    return game;
  }

  /**
   * Remove game from games list by id
   * @param id {string} Identifer of game to remove
   * @returns {boolean}
   */
  deleteGame(id: string): boolean {
    const game = this._gamesList.find((g) => g.id === id);
    if (!game) {
      return false;
    }

    this._gamesList = this._gamesList.filter((g) => g.id !== id);
    return true;
  }
}

export default GameManager;
