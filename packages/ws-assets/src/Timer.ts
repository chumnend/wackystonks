class Timer {
  private id: ReturnType<typeof setInterval> | ReturnType<typeof setTimeout>;
  private callback: () => void;
  private delayTime: number;
  private startTime: number;
  private timeLeft: number;
  private started: boolean;
  private paused: boolean;
  private loop: boolean;

  constructor(callback: () => void, delay: number, loop = false) {
    this.callback = callback;
    this.delayTime = delay;
    this.timeLeft = delay;
    this.started = false;
    this.paused = true;
    this.loop = loop;
  }

  /**
   * Creates interval or timeout timer to execute provided callback function
   * @param delay the interval (in milliseconds) to execute the callback
   */
  private _startTimer(delay: number): void {
    if (this.loop) {
      this.id = setInterval(this.callback, delay);
    } else {
      this.id = setTimeout(this.callback, delay);
    }
  }

  /**
   * Stops timer set by _startTimer method
   */
  private _stopTimer(): void {
    if (this.loop) {
      clearInterval(this.id);
    } else {
      clearTimeout(this.id);
    }
  }

  /**
   * Start or restart the timer
   * @returns {boolean} true if started/restarted, else false
   */
  public start(): boolean {
    if (this.started || !this.paused) {
      return false;
    }
    this.started = true;
    this.paused = false;
    this.startTime = new Date().getTime();
    this._stopTimer();
    this._startTimer(this.delayTime);
    return true;
  }

  /**
   * Pauses the timer
   * @returns {boolean} true if timer was paused, else false
   */
  public pause(): boolean {
    if (!this.started || this.paused) {
      return false;
    }
    this.paused = true;
    this.timeLeft = new Date().getTime() - this.startTime;
    this._stopTimer();
    return true;
  }
}

export default Timer;
