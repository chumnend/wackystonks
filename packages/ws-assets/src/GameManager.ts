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
    while (this.getGameById(id)) {
      id = generateCode();
    }

    const game = new Game(id);
    this._gamesList.push(game);
    return game;
  }

  findGame(id: string): Game | null {
    const game = this._gamesList.find((g) => g.id === id);
    if (!game) {
      return null;
    }
    return game;
  }

  deleteGame(id: string): boolean {
    const game = this.getGameById(id);
    if (!game) {
      return false;
    }

    this._gamesList = this._gamesList.filter((g) => g.id !== id);
    return true;
  }

  /**
   * Retireves a game instance from games list by it's id
   */
  private getGameById(id: string): Game {
    const foundGame = this._gamesList.find((g) => g.id === id);
    return foundGame;
  }
}

export default GameManager;
