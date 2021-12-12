interface TimerMethods {
  /** Start or resumes a timer */
  start(): boolean;
  /** Stops the timer */
  stop(): boolean;
  /** Resets the timer to the inital delay time */
  reset(): boolean;
  /** Return the remaining time (ms) */
  checkTime(): number;
}

enum TimerMode {
  COUNTDOWN = 0,
  LOOPED = 1,
}

class Timer implements TimerMethods {
  private callback: () => void;
  private delay: number;
  private mode: TimerMode;
  private timerId: ReturnType<typeof setInterval> | ReturnType<typeof setTimeout>;
  private startTime: number;
  private timeLeft: number;
  private paused: boolean;

  static COUNTDOWN_TIMER = TimerMode.COUNTDOWN;
  static LOOPED_TIMER = TimerMode.LOOPED;

  /**
   * Create a timer
   * @param callback {Function} Callback function to call after timer delay
   * @param delay {number} the interval (in milliseconds) to execute the callback
   * @param mode {boolean} If true. timer will repeat after it finishes. Default to false
   */
  constructor(callback: () => void, delay: number, mode: TimerMode) {
    this.callback = callback;
    this.delay = delay;
    this.mode = mode;
    this.startTime = null;
    this.timeLeft = delay;
    this.paused = true;
  }

  /**
   * Start the timer
   * @returns {boolean} true if started/resumed, else false
   */
  public start(): boolean {
    // check if already started, if so return false
    if (!this.paused) {
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
    if (this.paused) {
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
    this.timeLeft = this.delay;
    this._stopTimer();
    return true;
  }

  /**
   * Returns the remaining time
   * @returns {number} the remaining time (ms)
   */
  public checkTime(): number {
    if (this.paused) {
      return this.timeLeft;
    }
    return this.timeLeft - (new Date().getTime() - this.startTime);
  }

  /**
   * Creates interval or timeout timer to execute provided callback function
   */
  private _startTimer(): void {
    this.paused = false;
    this.startTime = new Date().getTime();
    switch (this.mode) {
      case TimerMode.COUNTDOWN:
        this.timerId = setTimeout(() => {
          this.callback();
          // TODO: What happens to timer after it gets here?
        }, this.timeLeft);
        break;
      case TimerMode.LOOPED:
        this.timerId = setTimeout(() => {
          this.callback();
          this.timeLeft = this.delay;
          this._startTimer();
        }, this.timeLeft);
        break;
    }
  }

  /**
   * Stops timer set by _startTimer method
   */
  private _stopTimer(): void {
    this.timeLeft = this.checkTime();
    this.paused = true;
    this.startTime = null;
    clearTimeout(this.timerId);
  }
}

export default Timer;
