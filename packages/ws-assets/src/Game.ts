import { Ticker, Timer } from './';
import Player, { PlayerInfo } from './Player';
import { StonkInfo } from './Stonk';
import round from './utils/round';

export interface GameState {
  /** An indentifier used to represent a game */
  id: string;
  /** Current status of the game */
  status: string;
  /** An array of players in a game */
  players: PlayerInfo[];
  /** An array of stonk details in ticker */
  stonks: StonkInfo[];
}

interface GameProps {
  /** An indentifier used to represent a game */
  id: string;
  /** Current status of the game */
  status: string;
  /** An array of players in a game */
  players: Player[];
  /** A ticker object used to manage stonks in a game */
  ticker: Ticker;
  /** A timer used to simulate stonks as game runs */
  simulationTimer: Timer;
  /** A timer used to manage game length */
  gameTimer: Timer;
}

interface GameMethods {
  /** Starts tne stonk ticker simulation */
  start: () => void;
  /** Stops the stonk ticker simulation */
  stop: () => void;
  /** Adds function handler that will be called every ticker interval */
  subscribe: (fn: () => void) => void;
  /** Removes function handler that will be called every ticker interval */
  unsubscribe: (fn: () => void) => void;
  /** Add player to game */
  addPlayer(id: string, name: string): boolean;
  /** Remove player from game */
  removePlayer(id: string): boolean;
  /** Returns an object detailing current game */
  getGameState: () => GameState;
}

class Game implements GameProps, GameMethods {
  private _id: string;
  private _status: string;
  private _players: Player[];
  private _ticker: Ticker;
  private _simulationTimer: Timer;
  private _gameTimer: Timer;
  private _handlers: (() => void)[];

  static DEFAULT_TICKER_SIMULATION_INTERVAL = 5000; // Default simulation timer interval (ms) 5000ms = 5s
  static DEFAULT_TICKER_STONKS_AMOUNT = 5;
  static DEFAULT_GAME_TIMER_INTERVAL = 60000; // Default game timer interval (ms) 60000ms = 1 min
  static STATUS_PARTY = 'party';
  static STATUS_START = 'start';
  static STATUS_END = 'end';

  /**
   * Create a Game instance
   * @param id {string} Identifier for the game
   * @param gameDelay  {number} Delay time for game timer
   * @param simulationDelay  {number} Delay time for simulation timer
   * @param numberOfStonks {number} Number of stonks to be generated for the game
   */
  constructor(
    id: string,
    gameDelay = Game.DEFAULT_GAME_TIMER_INTERVAL,
    simulationDelay = Game.DEFAULT_TICKER_SIMULATION_INTERVAL,
    numberOfStonks = Game.DEFAULT_TICKER_STONKS_AMOUNT,
  ) {
    this._id = id;
    this._status = Game.STATUS_PARTY;
    this._players = [];
    this._ticker = new Ticker(id);
    this._simulationTimer = new Timer(this.tick.bind(this), simulationDelay, Timer.LOOPED_TIMER);
    this._gameTimer = new Timer(() => null, gameDelay, Timer.COUNTDOWN_TIMER);
    this._handlers = [];

    // initilaize ticker stonks
    this.randomizeStonks(numberOfStonks);
    this._ticker.simulate();
  }

  /**
   * Retrieves game identifier
   * @returns {string}
   */
  get id(): string {
    return this._id;
  }

  /**
   * Retrieves game status
   * @returns {string}
   */
  get status(): string {
    return this._status;
  }

  /**
   * Retrieves array of players
   * @return {Player[]}
   */
  get players(): Player[] {
    return [...this._players];
  }

  /**
   * Retrieves stonk ticker
   * @return {Ticker}
   */
  get ticker(): Ticker {
    return this._ticker;
  }

  /**
   * Retrieves simulation timer
   * @returns {Timer}
   */
  get simulationTimer(): Timer {
    return this._simulationTimer;
  }

  /**
   * Retrieves game timer
   * @returns {Timer}
   */
  get gameTimer(): Timer {
    return this._gameTimer;
  }

  /**
   * Start the simulation timer
   */
  start(): void {
    this._status = Game.STATUS_START;
    this._simulationTimer.start();
    this._gameTimer.start();
  }

  /**
   * Stop the simulation timer
   */
  stop(): void {
    this._status = Game.STATUS_END;
    this._simulationTimer.stop();
    this._gameTimer.stop();
  }

  /**
   * Set a callback to used called after a cycle of the simulation timer
   * @param fn {Function}
   */
  subscribe(fn: () => void): void {
    this._handlers.push(fn);
  }

  /**
   * Remove a callback from being called after a cycle of the simulation timer
   * @param fn {Function}
   */
  unsubscribe(fn: () => void): void {
    this._handlers = this._handlers.filter((item) => {
      if (item !== fn) {
        return item;
      }
    });
  }

  /**
   * Add player a player to game
   * @param id {string} Player identifier
   * @param name {string} Name of the player
   * @returns {boolean}
   */
  addPlayer(id: string, name: string): boolean {
    const exists = this.checkForPlayer(id);
    if (exists) {
      return false;
    }

    const newPlayer = new Player(id, name);
    this._players.push(newPlayer);
    return true;
  }

  /**
   * Remove a player from game
   * @param id {string} Identifier of the player to remove
   * @returns {boolean}
   */
  removePlayer(id: string): boolean {
    const exists = this.checkForPlayer(id);
    if (!exists) {
      return false;
    }

    this._players = this._players.filter((player) => player.id !== id);
    return true;
  }

  /**
   * Returns current game state
   * @returns {GameState}
   */
  getGameState(): GameState {
    const stonks = this.ticker.getStonks();
    const players = this.players.map((p) => p.getInfo(stonks));

    return {
      id: this.id,
      status: this.status,
      players,
      stonks,
    };
  }

  /**
   * Populates the ticker with random stonks
   * @param numberOfStonks {Number} Number of stonks to add to ticker. Defaults to 5.
   */
  /* istanbul ignore next */
  private randomizeStonks(numberOfStonks: number = Game.DEFAULT_TICKER_STONKS_AMOUNT): void {
    for (let i = 0; i < numberOfStonks; i++) {
      const name = `Test ${i + 1}`;
      const symbol = `TST${i + 1}`;
      const initialPrice = round((Math.random() * 10000) / 100, 2);
      this._ticker.createStonk(name, symbol, initialPrice);
    }
  }

  /**
   * Triggers ticker simulation and calls subscribed callbacks every timer interval
   */
  private tick(): void {
    this._ticker.simulate();
    this._handlers.forEach((item) => {
      item();
    });
  }

  /**
   * Checks if player already exists
   */
  private checkForPlayer(id: string): boolean {
    const found = this._players.find((p) => p.id === id);
    return found ? true : false;
  }
}

export default Game;
