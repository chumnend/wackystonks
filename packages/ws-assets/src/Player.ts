import { StonkInfo, Ticker } from '.';
import deepClone from './utils/deepClone';

export interface PlayerInfo {
  /** An identifier used to represent a player */
  id: string;
  /** Name of a player */
  name: string;
  /** Details of a player's stonk portfolio */
  portfolio: StonkPortfolio;
  /** Total value of player's stonk portfolio */
  netValue: number;
}

export interface StonkPortfolio {
  [key: string]: number;
}

interface PlayerProps {
  /** An identifier used to represent a player */
  id: string;
  /** Name of a player */
  name: string;
  /** Details of a player's stonk portfolio */
  portfolio: StonkPortfolio;
}

interface PlayerMethods {
  /** Add stonks to a player's portfolio */
  addStonkToPortfolio(symbol: string, amount: number): boolean;
  /** Reomve stonks from a player's portfolio */
  removeStonkFromPortfolio(symbol: string, amount: number): boolean;
  /**Returns Object detailing player information */
  getPlayerInfo(stonks: StonkInfo[]): PlayerInfo;
}

class Player implements PlayerProps, PlayerMethods {
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
    return deepClone(this._portfolio);
  }

  /**
   * Add a stonk to player portfolio
   * @param symbol {string} Symbol for the stonk to add, ie. TZN
   * @param amount {number} number of stonks added
   * @returns {boolean}
   */
  addStonkToPortfolio(symbol: string, amount: number): boolean {
    if (symbol in this.portfolio) {
      this._portfolio[symbol] += amount;
    } else {
      this._portfolio[symbol] = amount;
    }
    return true;
  }

  /**
   * Remove stonk(s) from player's portfolio
   * @param symbol {string} Symbol of stonk to remove, ie. TZN
   * @param amount  {number} amount to remove
   * @returns {boolean}
   */
  removeStonkFromPortfolio(symbol: string, amount: number): boolean {
    if (!(symbol in this._portfolio)) {
      return false;
    }
    const newAmount = this._portfolio[symbol] - amount;
    this._portfolio[symbol] = newAmount > 0 ? newAmount : 0;
    return true;
  }

  /**
   * Returns player information
   * @returns {PlayerInfo}
   */
  getPlayerInfo(stonks: StonkInfo[]): PlayerInfo {
    let netValue = 0;
    for (const stonk of stonks) {
      netValue += this._portfolio[stonk.symbol] * stonk.price;
    }

    return {
      id: this.id,
      name: this.name,
      portfolio: this.portfolio,
      netValue,
    };
  }
}

export default Player;
