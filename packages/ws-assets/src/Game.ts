import { Ticker, Timer } from './';
import Player from './Player';
import round from './utils/round';

export interface GameProps {
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
}

export interface GameMethods {
  /** Starts tne stonk ticker simulation */
  start: () => void;
  /** Stops the stonk tikcer simulation */
  stop: () => void;
  /** Adds function handler that will be called every ticker interval */
  subscribe: (fn: () => void) => void;
  /** Removes function handler that will be called every ticker interval*/
  unsubscribe: (fn: () => void) => void;
}

class Game implements GameProps, GameMethods {
  private _id: string;
  private _status: string;
  private _players: Player[];
  private _ticker: Ticker;
  private _simulationTimer: Timer;
  private _handlers: (() => void)[];

  static DEFAULT_TICKER_SIMULATION_INTERVAL = 3000; // Default simualtion timer interval (ms)
  static DEFAULT_TICKER_STONKS_AMOUNT = 5;

  static STATUS_PARTY = 'party';

  /**
   * Create a Game instance
   * @param id {string} Identifier for the game
   * @param delay  {number} Delay time for simulation timer
   * @param numberOfStonks {number} Number of stonks to be generated for the game
   */
  constructor(
    id: string,
    delay = Game.DEFAULT_TICKER_SIMULATION_INTERVAL,
    numberOfStonks = Game.DEFAULT_TICKER_STONKS_AMOUNT,
  ) {
    this._id = id;
    this._status = Game.STATUS_PARTY;
    this._ticker = new Ticker(id);
    this.randomizeStonks(numberOfStonks);
    this._simulationTimer = new Timer(this.tick.bind(this), delay, true);
    this._handlers = [];
    this._players = [];
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
   * Start the simulation timer
   */
  start(): void {
    this._simulationTimer.start();
  }

  /**
   * Stop the simulation timer
   */
  stop(): void {
    this._simulationTimer.stop();
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
