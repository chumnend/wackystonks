import Timer from './Timer';
import { IGame, GameConfiguration, ITimer, TimerMode } from '../types';

const defaultGameConfiguration: GameConfiguration = {
  tickTimerDelay: 1000, // 1 second
  prepTimerDelay: 5000, // 5 seconds
  gameTimerDelay: 60000, // 60 seconds
};

class Game implements IGame {
  private _id: string;
  private _status: string;
  private _tickTimer: ITimer;
  private _prepTimer: Timer;
  private _gameTimer: ITimer;
  private _tickHandlers: (() => void)[];

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
    this._tickTimer = new Timer(this._tick.bind(this), config.tickTimerDelay, TimerMode.LOOPED);
    this._prepTimer = new Timer(this._playStep.bind(this), config.prepTimerDelay, TimerMode.COUNTDOWN);
    this._gameTimer = new Timer(this._stopStep.bind(this), config.gameTimerDelay, TimerMode.COUNTDOWN);
    this._tickHandlers = [];
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

  public start(): void {
    this._prepStep();
  }

  public stop(): void {
    this._stopStep();
  }

  subscribeToTick(callback: () => void): void {
    this._tickHandlers.push(callback);
  }

  private _tick(): void {
    this._tickHandlers.forEach((cb) => {
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
  }

  private _stopStep(): void {
    this._status = Game.STATUS_STOPPED;
    this._tickTimer.reset();
    this._prepTimer.reset();
    this._gameTimer.reset();
  }
}

export default Game;
