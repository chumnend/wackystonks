import Stonk from './Stonk';
import round from './utils/round';

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
    const stonks = [];
    this.stonks.forEach((stonk) => {
      stonks.push({
        name: stonk.name,
        symbol: stonk.symbol,
        price: stonk.price,
        previousPrices: stonk.previousPrices,
      });
    });
    return stonks;
  }

  public createStonk(name: string, symbol: string, initialPrice: number): boolean {
    try {
      const stonk = new Stonk(name, symbol, initialPrice);
      this.addStonk(stonk);
      return true;
    } catch (e) {
      return false;
    }
  }

  public addStonk(stonk: Stonk): boolean {
    this.stonks.push(stonk);
    return true;
  }

  /**
   * Modifies the price of all stonks in the ticker. Change is based relative to the current price of each stonk.
   */
  public simulate(): void {
    this.stonks.forEach((stonk, idx) => {
      /* istanbul ignore next */
      const direction = Math.random() > 0.5 ? 1 : -1;
      const change = round((Math.random() * stonk.price) / 10, 2);
      this.stonks[idx].modifyPrice(direction * change);
    });
  }
}

export default Ticker;
