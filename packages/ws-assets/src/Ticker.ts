import Stonk from './Stonk';

class Ticker {
  private stonks: Stonk[];

  constructor() {
    this.stonks = [];
  }

  public listStonks(): void {
    this.stonks.forEach((stonk) => {
      console.log(`${stonk.getName()}<${stonk.getSymbol()}>: $${stonk.getPrice()}`);
    });
  }

  public addStonk(stonk: Stonk): void {
    this.stonks.push(stonk);
  }
}

export default Ticker;
