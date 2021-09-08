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
    const stonksCopy = [];
    this.stonks.forEach((stonk) => {
      stonksCopy.push(stonk.clone());
    });
    return stonksCopy;
  }

  public addStonk(stonk: Stonk): void {
    this.stonks.push(stonk);
  }

  /**
   * Modifies the price of all stonks in the ticker. Change is based relative to the current price of each stonk.
   */
  public simulate(): void {
    this.stonks.forEach((stonk, idx) => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      const change = round((Math.random() * stonk.getPrice()) / 10, 2);
      this.stonks[idx].modifyPrice(direction * change);
    });
  }
}

export default Ticker;
