export interface StonkPortfolio {
  [key: string]: number;
}
export interface PlayerProps {
  /** An identifier used to represent a player */
  id: string;
  /** Name of a player */
  name: string;
  /** Details of a player's stonk portfolio */
  portfolio: StonkPortfolio;
}

export interface PlayerMethods {
  /** Add stonks to a palyer's portfolio */
  addStonkToPortfolio(symbol: string, amount: number): boolean;
  /** Reomve stonks from a player's portfolio */
  removeStonkToPortfolio(symbol: string, amount: number): boolean;
}

class Player implements PlayerProps {
  private _id: string;
  private _name: string;
  private _portfolio: StonkPortfolio;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this._portfolio = {};
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get portfolio(): StonkPortfolio {
    return this._portfolio;
  }

  addStonkToPortfolio(symbol: string, amount: number): boolean {
    if (symbol in this.portfolio) {
      this.portfolio[symbol] += amount;
    } else {
      this.portfolio[symbol] = amount;
    }

    return true;
  }

  removeStonkToPortfolio(symbol: string, amount: number): boolean {
    if (!(symbol in this.portfolio)) {
      return false;
    }

    const newAmount = this.portfolio[symbol] - amount;
    this.portfolio[symbol] = newAmount > 0 ? newAmount : 0;
    return true;
  }
}

export default Player;
