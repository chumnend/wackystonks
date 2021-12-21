export enum TimerMode {
  COUNTDOWN = 0,
  LOOPED = 1,
}

export interface ITimer {
  /** Start or resumes a timer */
  start(): boolean;
  /** Stops the timer */
  stop(): boolean;
  /** Resets the timer to the inital delay time */
  reset(): boolean;
  /** Return the remaining time (ms) */
  checkTime(): number;
}
