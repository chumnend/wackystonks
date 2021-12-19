import { TimerMode, ITimer } from '../types';

class Timer implements ITimer {
  private _id: ReturnType<typeof setTimeout> | ReturnType<typeof setInterval>;
  private _callback: () => void;
  private _delay: number;
  private _mode: TimerMode;
  private _startTime: number;
  private _timeLeft: number;
  private _paused: boolean;

  static COUNTDOWN = TimerMode.COUNTDOWN;
  static LOOPED = TimerMode.LOOPED;

  /**
   * Create a timer
   * @param callback {Function} Callback function to call after timer delay
   * @param delay {number} the interval (in milliseconds) to execute the callback
   * @param mode {boolean} If true. timer will repeat after it finishes. Default to false
   */
  constructor(callback: () => void, delay: number, mode: TimerMode) {
    this._id = null;
    this._callback = callback;
    this._delay = delay;
    this._mode = mode;
    this._startTime = null;
    this._timeLeft = delay;
    this._paused = true;
  }

  /**
   * Start the timer
   * @returns {boolean} true if started/resumed, else false
   */
  public start(): boolean {
    // check if already started, if so return false
    if (!this._paused) {
      return false;
    }
    this._startTimer();
    return true;
  }

  /**
   * Stop the timer
   * @returns {boolean} true if timer was stopped, else false
   */
  public stop(): boolean {
    // check if already stopped, if so return false
    if (this._paused) {
      return false;
    }
    this._stopTimer();
    return true;
  }

  /**
   * Stops the timer and resets the timer to the initial delay time
   * @returns {boolean} true if restared, else false
   */
  public reset(): boolean {
    this._timeLeft = this._delay;
    this._stopTimer();
    return true;
  }

  /**
   * Returns the remaining time
   * @returns {number} the remaining time (ms)
   */
  public checkTime(): number {
    if (this._paused) {
      return this._timeLeft;
    }
    return this._timeLeft - (new Date().getTime() - this._startTime);
  }

  /**
   * Creates interval or timeout timer to execute provided callback function
   */
  private _startTimer(): void {
    this._paused = false;
    this._startTime = new Date().getTime();
    switch (this._mode) {
      case TimerMode.COUNTDOWN:
        this._id = setTimeout(() => {
          this._callback();
          // TODO: What happens to timer after it gets here?
        }, this._timeLeft);
        break;
      case TimerMode.LOOPED:
        this._id = setTimeout(() => {
          this._callback();
          this._timeLeft = this._delay;
          this._startTimer();
        }, this._timeLeft);
        break;
    }
  }

  /**
   * Stops timer set by _startTimer method
   */
  private _stopTimer(): void {
    this._timeLeft = this.checkTime();
    this._paused = true;
    this._startTime = null;
    clearTimeout(this._id);
  }
}

export default Timer;
