import Stonk, { StonkProps } from './Stonk';
import round from './utils/round';

export interface TickerProps {
  /** Name of a ticker */
  name: string;
  /** An array of stonks in tikcer */
  stonks: Stonk[];
}

export interface TickerMethods {
  /** Create new sonk and add it to a ticker */
  createStonk(name: string, symbol: string, initialPrice: number): boolean;
  /** Add a stonk to this ticker */
  addStonk(stonk: Stonk): boolean;
  /** Get array of stonk properties in the ticker */
  getStonks(): StonkProps[];
  /** Randomly modifies the values of stonks in the ticker */
  simulate(): void;
}

class Ticker implements TickerProps, TickerMethods {
  private _name: string;
  private _stonks: Stonk[];

  /**
   * Create a ticker
   * @param name {string} Name of the ticker
   */
  constructor(name: string) {
    this._name = name;
    this._stonks = [];
  }

  get name(): string {
    return this._name;
  }

  get stonks(): Stonk[] {
    return this._stonks;
  }

  /**
   * Create a stonk and add to ticker
   * @param {string} name - Name of the stonk
   * @param {string} symbol - Symbol representing stonk (Max 4 characters)
   * @param {number} initialPrice - Initial value of a stonk (Must be positive value)
   * @returns {boolean} True if successfully created, else false
   */
  public createStonk(name: string, symbol: string, initialPrice: number): boolean {
    try {
      const stonk = new Stonk(name, symbol, initialPrice);
      this.addStonk(stonk);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Add a stonk to this ticker
   * @param stonk {Stonk} Stonk to add to ticker
   * @returns {boolean} True if successfully created, else false
   */
  public addStonk(stonk: Stonk): boolean {
    this.stonks.push(stonk);
    return true;
  }

  /**
   * Get an array representation of all the stonks in this ticker
   * @returns [Object]
   */
  public getStonks(): StonkProps[] {
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
