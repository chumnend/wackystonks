interface TimerMethods {
  /** Start or resumes a timer */
  start(): boolean;
  /** Stops the timer */
  stop(): boolean;
  /** Resets the timer to the inital delay time */
  reset(): boolean;
}

enum TimerMode {
  COUNTDOWN = 0,
  LOOPED = 1,
}

class Timer implements TimerMethods {
  private id: ReturnType<typeof setInterval> | ReturnType<typeof setTimeout>;
  private callback: () => void;
  private delay: number;
  private startTime: number;
  private timeLeft: number;
  private paused: boolean;
  private mode: TimerMode;

  static COUNTDOWN_TIMER = TimerMode.COUNTDOWN;
  static LOOPED_TIMER = TimerMode.LOOPED;

  /**
   * Create a timer
   * @param callback {Function} Callback function to call after timer delay
   * @param delay {number} the interval (in milliseconds) to execute the callback
   * @param mode {boolean} If true. timer will repeat after it finishes. Default to false
   */
  constructor(callback: () => void, delay: number, mode = TimerMode.COUNTDOWN) {
    this.callback = callback;
    this.delay = delay;
    this.timeLeft = delay;
    this.paused = true;
    this.mode = mode;
  }

  /**
   * Creates interval or timeout timer to execute provided callback function
   * @param delay the interval (in milliseconds) to execute the callback
   */
  private _startTimer(delay: number): void {
    switch (this.mode) {
      case TimerMode.COUNTDOWN:
        this.id = setTimeout(this.callback, delay);
        break;
      case TimerMode.LOOPED:
        this.id = setInterval(this.callback, delay);
        break;
    }
  }

  /**
   * Stops timer set by _startTimer method
   */
  private _stopTimer(): void {
    switch (this.mode) {
      case TimerMode.COUNTDOWN:
        clearTimeout(this.id);
        break;
      case TimerMode.LOOPED:
        clearInterval(this.id);
        break;
    }
  }

  /**
   * Start or resumes the timer
   * @returns {boolean} true if started/restarted, else false
   */
  public start(): boolean {
    if (!this.paused) {
      return false;
    }
    this.paused = false;
    this.startTime = new Date().getTime();
    this._stopTimer();
    this._startTimer(this.timeLeft);
    return true;
  }

  /**
   * Stops the timer
   * @returns {boolean} true if timer was stopped, else false
   */
  public stop(): boolean {
    if (this.paused) {
      return false;
    }
    this.paused = true;
    this.timeLeft = new Date().getTime() - this.startTime;
    this._stopTimer();
    return true;
  }

  /**
   * Resets the timer to the inital delay time
   * @returns {boolean} true if restared, else false
   */
  public reset(): boolean {
    this.paused = true;
    this._stopTimer();
    this.timeLeft = this.delay;
    return true;
  }
}

export default Timer;
