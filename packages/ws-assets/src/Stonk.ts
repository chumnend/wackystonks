import round from './utils/round';

export interface StonkInfo {
  /** Name of a stonk */
  name: string;
  /** Symbol representing stonk (Max 4 characters) */
  symbol: string;
  /** Current value of a stonk */
  price: number;
  /** Log of previous prices (Up to 100 entries) */
  previousPrices: number[];
}

interface StonkProps {
  /** Name of a stonk */
  name: string;
  /** Symbol representing stonk (Max 4 characters) */
  symbol: string;
  /** Current value of a stonk */
  price: number;
  /** Log of previous prices (Up to 100 entries) */
  previousPrices: number[];
}

interface StonkMethods {
  /** Get a stonk's details */
  getInfo(): StonkInfo;
  /** Modify the value of a stonk */
  modifyPrice(value: number): void;
}

class Stonk implements StonkProps, StonkMethods {
  private _name: string;
  private _symbol: string;
  private _price: number;
  private _previousPrices: number[];

  static MAX_SYMBOL_LENGTH = 4;
  static MAX_PRICES_LOGGED = 100;

  /**
   * Create a stonk
   * @param {string} name - Name of the stonk
   * @param {string} symbol - Symbol representing stonk (Max 4 characters)
   * @param {number} initialPrice - Initial value of a stonk (Must be positive value)
   */
  constructor(name: string, symbol: string, initialPrice: number) {
    this._name = name;

    if (symbol.length <= Stonk.MAX_SYMBOL_LENGTH) {
      this._symbol = symbol;
    } else {
      throw new Error(`"symbol" cannot exceed ${Stonk.MAX_SYMBOL_LENGTH} characters`);
    }

    if (initialPrice >= 0) {
      this._price = Math.round(initialPrice * 100) / 100;
      this._previousPrices = [this._price];
    } else {
      throw new Error('invalid initial price');
    }
  }

  /**
   * Get name of the stonk
   * @returns {string}
   */
  get name(): string {
    return this._name;
  }

  /**
   * Get symbol of the stonk
   * @return {string}
   */
  get symbol(): string {
    return this._symbol;
  }

  /**
   * Get current price of the stonk
   * @returns {number}
   */
  get price(): number {
    return this._price;
  }

  /**
   * Get past 100 prices
   * @returns [number]
   */
  get previousPrices(): number[] {
    return [...this._previousPrices];
  }

  /**
   * Returns a stonk's details
   * @returns {StonkInfo}
   */
  public getInfo(): StonkInfo {
    return {
      name: this.name,
      symbol: this.symbol,
      price: this.price,
      previousPrices: [...this.previousPrices],
    };
  }

  /**
   * Modify the price by a given amount
   * @param value {number} amount to modify price by (+ve/-ve)
   */
  public modifyPrice(value: number): void {
    const newPrice = round(this.price + value, 2);
    this._price = newPrice > 0 ? newPrice : 0;
    this._previousPrices.push(this.price);
    if (this._previousPrices.length > Stonk.MAX_PRICES_LOGGED) {
      this._previousPrices.shift();
    }
  }
}

export default Stonk;
