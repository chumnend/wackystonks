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

  /**
   * Create a player
   * @param id {string} Identifier for player
   * @param name {string} name of the player
   */
  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this._portfolio = {};
  }

  /**
   * Get player's identifier
   * @returns {string}
   */
  get id(): string {
    return this._id;
  }

  /**
   * Get player's name
   * @returns {string}
   */
  get name(): string {
    return this._name;
  }

  /**
   * Get players stonk details
   * @returns {StonkPortfolio}
   */
  get portfolio(): StonkPortfolio {
    return this._portfolio;
  }

  /**
   * Add a stonk to player portfolio
   * @param symbol {string} Symbol for the stonk to add, ie. TZN
   * @param amount {number} number of stonks added
   * @returns {boolean}
   */
  addStonkToPortfolio(symbol: string, amount: number): boolean {
    if (symbol in this.portfolio) {
      this.portfolio[symbol] += amount;
    } else {
      this.portfolio[symbol] = amount;
    }
    return true;
  }

  /**
   * Remove stonk(s) from player's portfolio
   * @param symbol {string} Symbol of stonk to remove, ie. TZN
   * @param amount  {number} amount to remove
   * @returns {boolean}
   */
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
