import { Ticker, Timer } from './';
import round from './utils/round';

export interface GameProps {
  /** An indentifier used to represent a game */
  id: string;
  /** A ticker object used to manage stonks in a game */
  ticker: Ticker;
  /** A timer used to simulate stonks as game runs */
  timer: Timer;
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
  private _ticker: Ticker;
  private _timer: Timer;
  private _handlers: (() => void)[];

  static DEFAULT_TICKER_SIMULATION_INTERVAL = 3000; // Default timer interval (ms)
  static DEFAULT_TICKER_STONKS_AMOUNT = 5;

  constructor(
    id: string,
    delay = Game.DEFAULT_TICKER_SIMULATION_INTERVAL,
    numberOfStonks = Game.DEFAULT_TICKER_STONKS_AMOUNT,
  ) {
    this._id = id;
    this._ticker = new Ticker(id);
    this.randomizeStonks(numberOfStonks);
    this._timer = new Timer(this.tick.bind(this), delay, true);
    this._handlers = [];
  }

  get id(): string {
    return this._id;
  }

  get ticker(): Ticker {
    return this._ticker;
  }

  get timer(): Timer {
    return this._timer;
  }

  start(): void {
    this._timer.start();
  }

  stop(): void {
    this._timer.stop();
  }

  subscribe(fn: () => void): void {
    this._handlers.push(fn);
  }

  unsubscribe(fn: () => void): void {
    this._handlers = this._handlers.filter((item) => {
      if (item !== fn) {
        return item;
      }
    });
  }

  /**
   * Populates the ticker with random stonks
   * @param numberOfStonks {Number} Number of stonks to add to ticker. Defaults to 5.
   */
  private randomizeStonks(numberOfStonks = Game.DEFAULT_TICKER_STONKS_AMOUNT): void {
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
}

export default Game;
