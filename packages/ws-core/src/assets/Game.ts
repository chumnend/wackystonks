import { Player, Timer, Stonk } from './';
import { IGame, ConfigurationType, GameType, PlayerType, StonkType, ITimer, TimerMode } from '../types';
import { round } from '../utils';

const defaultGameConfiguration: ConfigurationType = {
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
  private _config: ConfigurationType;
  private _tickTimer: ITimer;
  private _simulationTimer: Timer;
  private _prepTimer: Timer;
  private _gameTimer: ITimer;
  private _host: string;
  private _players: Player[];
  private _stonks: Stonk[];
  private _handlers: (() => void)[];

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
    this._simulationTimer = new Timer(this._simulationEvent.bind(this), config.simulationDelay, TimerMode.LOOPED);
    this._prepTimer = new Timer(this._playStep.bind(this), config.prepTimerDelay, TimerMode.COUNTDOWN);
    this._gameTimer = new Timer(this._stopStep.bind(this), config.gameTimerDelay, TimerMode.COUNTDOWN);
    this._host = '';
    this._players = [];
    this._stonks = [];
    this._randomizeStonks();
    this._handlers = [];
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
   * Returns host id
   * @return {string}
   */
  get host(): string {
    return this._host;
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
   * Returns game information
   * @return {GameType}
   */
  public gameState(): GameType {
    // load all players information
    const players: PlayerType[] = this.players.map((player) => ({
      id: player.id,
      name: player.name,
      portfolio: player.portfolio,
      funds: player.funds,
      netValue: this._calculateNetValue(player),
    }));

    // load all stonks information
    const stonks: StonkType[] = this.stonks.map((stonk) => ({
      name: stonk.name,
      symbol: stonk.symbol,
      price: stonk.price,
      previousPrices: [...stonk.previousPrices],
    }));

    return {
      id: this.id,
      status: this.status,
      players,
      stonks,
      timeLeft: this._checkTime(),
    };
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
    const player = new Player(id, name, this._config.initialFunds);
    this._players.push(player);
    this._setHost(); // set game host
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
    this._setHost(); // set new host if previous host left
    return true;
  }

  /**
   * Initiate stonk purchase for a player
   * @param {string} playerId
   * @param {string} symbol
   * @param {number} amount
   * @returns {boolean} true if successful
   */
  buyStonk(playerId: string, symbol: string, amount: number): boolean {
    // find player
    const player = this._findPlayer(playerId);
    if (!player) {
      return false;
    }

    // find stonk
    const stonk = this._findStonk(symbol);
    if (!stonk) {
      return false;
    }

    // check if enough funds to purchase stonk
    const fundsNeeded = round(stonk.price * amount, 2);
    if (player.funds < fundsNeeded) {
      return false;
    }

    // adjust player funds and add stonk to portfolio
    player.funds = round(player.funds - fundsNeeded, 2);
    player.addToPortfolio(stonk.symbol, amount);
    return true;
  }

  /**
   * Initiate stonk sell for a player
   * @param {string} playerId
   * @param {string} symbol
   * @param {number} amount
   * @returns {boolean} true if successful
   */
  sellStonk(playerId: string, symbol: string, amount: number): boolean {
    // find player
    const player = this._findPlayer(playerId);
    if (!player) {
      return false;
    }

    // find stonk
    const stonk = this._findStonk(symbol);
    if (!stonk) {
      return false;
    }

    // check if stonk in portfolio and if there is enough to sell
    if (!(stonk.symbol in player.portfolio) || player.portfolio[stonk.symbol] < amount) {
      return false;
    }
    // add funds and remove stonks from portfolio
    player.funds += stonk.price * amount;
    player.removeFromPortfolio(stonk.symbol, amount);
    return true;
  }

  /**
   * Pass callback to be called on each game event trigger
   * @param {(event: string) => void} callback
   * @returns {boolean} true if successful
   */
  listenForGameEvents(callback: () => void): boolean {
    this._handlers.push(callback);
    return true;
  }

  /**
   * Find a player by id
   * @param {string} id
   */
  private _findPlayer(id: string): Player {
    return this._players.find((player) => player.id === id);
  }

  /**
   * Sets the host for the game
   */
  private _setHost(): void {
    if (this._players.length) {
      this._host = this._players[0].id;
    } else {
      this._host = '';
    }
  }

  /**
   * Calculates the net value of a player based on funds and stonks in portfolio
   * @param player {Player} the player to calculate net value for
   * @returns {number} the nert value of the player
   */
  private _calculateNetValue(player: Player): number {
    let netValue = player.funds;
    /* istanbul ignore next */
    for (const symbol in player.portfolio) {
      const stonk = this._stonks.find((stonk) => stonk.symbol === symbol);
      netValue += stonk.price * player.portfolio[symbol];
    }
    return round(netValue, 2);
  }

  /**
   * Find a stonk by symbol
   * @param {string} symbol
   */
  private _findStonk(symbol: string): Stonk {
    return this._stonks.find((stonk) => stonk.symbol === symbol);
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

  private _update(): void {
    this._handlers.forEach((cb) => {
      cb();
    });
  }

  private _tickEvent(): void {
    this._update();
  }

  private _simulationEvent(): void {
    this._simulate();
    this._update();
  }

  private _prepStep(): void {
    // update status and start preperation timers
    this._status = Game.STATUS_PREPARING;
    this._tickTimer.start();
    this._prepTimer.start();
  }

  private _playStep(): void {
    // update status and start game realted timers
    this._status = Game.STATUS_PLAYING;
    this._gameTimer.start();
    this._simulationTimer.start();
    this._update();
  }

  private _stopStep(): void {
    // update status and stop all timers
    this._status = Game.STATUS_STOPPED;
    this._tickTimer.reset();
    this._prepTimer.reset();
    this._gameTimer.reset();
    this._simulationTimer.reset();
    this._update();
  }

  private _checkTime(): number {
    switch (this._status) {
      case Game.STATUS_PREPARING:
        return this._prepTimer.checkTime();
      case Game.STATUS_PLAYING:
        return this._gameTimer.checkTime();
      default:
        // in other status mode the game will not be running therefore return 0
        return 0;
    }
  }
}

export default Game;
