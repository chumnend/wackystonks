class Timer {
  private id: ReturnType<typeof setInterval> | ReturnType<typeof setTimeout>;
  private callback: () => void;
  private delay: number;
  private startTime: number;
  private timeLeft: number;
  private paused: boolean;
  private loop: boolean;

  constructor(callback: () => void, delay: number, loop = false) {
    this.callback = callback;
    this.delay = delay;
    this.timeLeft = delay;
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
