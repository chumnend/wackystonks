import round from './utils/round';

export interface StonkProps {
  /** Name of a stonk */
  name: string;
  /** Symbol representing stonk (Max 4 characters) */
  symbol: string;
  /** Current value of a stonk */
  price: number;
  /** Log of previous prices (Up to 100 entries) */
  previousPrices: number[];
}

export interface StonkMethods {
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

  get name(): string {
    return this._name;
  }

  get symbol(): string {
    return this._symbol;
  }

  get price(): number {
    return this._price;
  }

  get previousPrices(): number[] {
    return [...this._previousPrices];
  }

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
