class Timer {
  private id: ReturnType<typeof setInterval>;
  private timeRemaining: number;
  private startTime: Date;
  private callback: () => void;

  constructor(callback: () => void, delay: number) {
    this.callback = callback;
    this.timeRemaining = delay;
    this.startTime = new Date();
  }

  public resume(): void {
    clearTimeout(this.id);
    this.id = setTimeout(this.callback, this.timeRemaining);
  }

  public pause(): void {
    clearTimeout(this.id);
    this.timeRemaining = new Date().getTime() - this.startTime.getTime();
  }
}

export default Timer;
