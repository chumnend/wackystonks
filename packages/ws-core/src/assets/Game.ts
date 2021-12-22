import { Player, Timer, Stonk } from './';
import { IGame, GameConfiguration, ITimer, TimerMode } from '../types';
import { round } from '../utils';

const defaultGameConfiguration: GameConfiguration = {
  tickTimerDelay: 1000, // 1 second
  simulationDelay: 2000, // 2 second
  prepTimerDelay: 5000, // 5 seconds
  gameTimerDelay: 60000, // 60 seconds
  initialFunds: 10000,
  numberOfStonks: 4,
};

class Game implements IGame {
  private _id: string;
  private _status: string;
  private _config: GameConfiguration;
  private _tickTimer: ITimer;
  private _tickHandlers: (() => void)[];
  private _simulationTimer: Timer;
  private _simulationHandlers: (() => void)[];
  private _prepTimer: Timer;
  private _gameTimer: ITimer;
  private _players: Player[];
  private _stonks: Stonk[];

  /*
    Game Flow:  WAITING --> PREPARING --> PLAYING --> STOPPED
  */
  static STATUS_WAITING = 'waiting'; // game has not been started, but waiting for settings to be finalized
  static STATUS_PREPARING = 'preparing'; // game is about to start
  static STATUS_PLAYING = 'playing'; // game is running
  static STATUS_STOPPED = 'stopped'; // game has finished

  /**
   * Create a Game instance
   * @param id {string} Identifier for the game
   */
  constructor(id: string, config = defaultGameConfiguration) {
    this._id = id;
    this._status = Game.STATUS_WAITING;
    this._config = config;
    this._tickTimer = new Timer(this._tickEvent.bind(this), config.tickTimerDelay, TimerMode.LOOPED);
    this._tickHandlers = [];
    this._simulationTimer = new Timer(this._simulationEvent.bind(this), config.simulationDelay, TimerMode.LOOPED);
    this._simulationHandlers = [];
    this._prepTimer = new Timer(this._playStep.bind(this), config.prepTimerDelay, TimerMode.COUNTDOWN);
    this._gameTimer = new Timer(this._stopStep.bind(this), config.gameTimerDelay, TimerMode.COUNTDOWN);

    this._players = [];
    this._stonks = [];
    this._randomizeStonks();
  }

  /**
   * Retrieve game identifier
   * @returns {string}
   */
  public get id(): string {
    return this._id;
  }

  /**
   * Retrieve game status
   * @return {string}
   */
  public get status(): string {
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
   * Retrieves array of stonks
   * @return {Stonk[]}
   */
  get stonks(): Stonk[] {
    return [...this._stonks];
  }

  /**
   * Start the simulation timer
   */
  public startGame(): void {
    this._prepStep();
  }

  /**
   * Stop the simulation timer
   */
  public stopGame(): void {
    this._stopStep();
  }

  /**
   * Add player a player to game
   * @param id {string} Player identifier
   * @param name {string} Name of the player
   * @returns {boolean}
   */
  addPlayer(id: string, name: string): boolean {
    const exists = this._players.find((p) => p.id === id);
    if (exists) {
      return false;
    }
    const newPlayer = new Player(id, name, this._config.initialFunds);
    this._players.push(newPlayer);
    return true;
  }

  /**
   * Remove a player from game
   * @param id {string} Identifier of the player to remove
   * @returns {boolean}
   */
  removePlayer(id: string): boolean {
    const exists = this._players.find((p) => p.id === id);
    if (!exists) {
      return false;
    }
    this._players = this._players.filter((player) => player.id !== id);
    return true;
  }

  listenForTickEvent(callback: () => void): boolean {
    this._tickHandlers.push(callback);
    return true;
  }

  listenForSimulationEvent(callback: () => void): boolean {
    this._simulationHandlers.push(callback);
    return true;
  }

  /**
   * Populates the ticker with random stonks
   * @param numberOfStonks {Number} Number of stonks to add to ticker. Defaults to 5.
   */
  private _randomizeStonks(): void {
    for (let i = 0; i < this._config.numberOfStonks; i++) {
      const name = `Test ${i + 1}`;
      const symbol = `TST${i + 1}`;
      const initialPrice = round((Math.random() * 10000) / 100, 2);
      const stonk = new Stonk(name, symbol, initialPrice);
      this._stonks.push(stonk);
    }
  }

  /**
   * Modifies the price of all stonks in the ticker. Change is based relative to the current price of each stonk.
   */
  private _simulate(): void {
    this._stonks.forEach((stonk, idx) => {
      /* istanbul ignore next */
      const direction = Math.random() > 0.5 ? 1 : -1;
      const change = round((Math.random() * stonk.price) / 10, 2);
      this.stonks[idx].modifyPrice(direction * change);
    });
  }

  private _tickEvent(): void {
    this._tickHandlers.forEach((cb) => {
      cb();
    });
  }

  private _simulationEvent(): void {
    this._simulate();
    this._simulationHandlers.forEach((cb) => {
      cb();
    });
  }

  private _prepStep(): void {
    this._status = Game.STATUS_PREPARING;
    this._tickTimer.start();
    this._prepTimer.start();
  }

  private _playStep(): void {
    this._status = Game.STATUS_PLAYING;
    this._gameTimer.start();
    this._simulationTimer.start();
  }

  private _stopStep(): void {
    this._status = Game.STATUS_STOPPED;
    this._tickTimer.reset();
    this._prepTimer.reset();
    this._gameTimer.reset();
    this._simulationTimer.reset();
  }
}

export default Game;
