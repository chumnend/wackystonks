import Stonk from './Stonk';

class Ticker {
  private name: string;
  private stonks: Stonk[];

  constructor(name: string) {
    this.name = name;
    this.stonks = [];
  }

  public getName(): string {
    return this.name;
  }

  public getStonks(): Stonk[] {
    return [...this.stonks];
  }

  public addStonk(stonk: Stonk): void {
    this.stonks.push(stonk);
  }
}

export default Ticker;
