import { StonkInfo } from '.';
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
  /** The amount of mony a player has */
  funds: number;
}

interface PlayerMethods {
  /** Returns Object detailing player information */
  getInfo(stonks: StonkInfo[]): PlayerInfo;
  /** Purchase a stonk if sufficient funds */
  buyStonk(stonk: StonkInfo, amount: number): boolean;
  /** Sell a stonk, given appropriate amount */
  sellStonk(stonk: StonkInfo, amount: number): boolean;
}

class Player implements PlayerProps, PlayerMethods {
  private _id: string;
  private _name: string;
  private _portfolio: StonkPortfolio;
  private _funds: number;

  static DEFAULT_PLAYER_STARTING_FUNDS = 10000;

  /**
   * Create a player
   * @param id {string} Identifier for player
   * @param name {string} name of the player
   */
  constructor(id: string, name: string, initialFunds = Player.DEFAULT_PLAYER_STARTING_FUNDS) {
    this._id = id;
    this._name = name;
    this._portfolio = {};
    this._funds = initialFunds;
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
   * Get player's funds amount
   * @return {number}
   */
  get funds(): number {
    return this._funds;
  }

  /**
   * Returns player information
   * @returns {PlayerInfo}
   */
  getInfo(stonks: StonkInfo[]): PlayerInfo {
    let netValue = this.funds;
    for (const stonk of stonks) {
      if (this._portfolio.hasOwnProperty(stonk.symbol)) {
        netValue += this._portfolio[stonk.symbol] * stonk.price;
      }
    }

    return {
      id: this.id,
      name: this.name,
      portfolio: this.portfolio,
      netValue,
    };
  }

  /**
   * Buys a stonk, if sufficient funds
   * @param {StonkInfo} stonk - the stonk being purchased
   * @param {number} amount - the amount of stonk to purchase
   * @returns {bollean}
   */
  buyStonk(stonk: StonkInfo, amount: number): boolean {
    // check if enough funds to purchase stonk
    const fundsNeeded = stonk.price * amount;
    if (this.funds < fundsNeeded) {
      return false;
    }

    // adjust player funds and add stonk to portfolio
    this._funds -= fundsNeeded;
    if (stonk.symbol in this._portfolio) {
      this._portfolio[stonk.symbol] += amount;
    } else {
      this._portfolio[stonk.symbol] = amount;
    }
    return true;
  }

  /**
   * Sell a stonk, if sufficents stonks owned
   * @param {StonkInfo} stonk - stonk to sell
   * @param {number} amount - amount of stonk to sell
   */
  sellStonk(stonk: StonkInfo, amount: number): boolean {
    // check if stonks in portfolio
    if (!(stonk.symbol in this._portfolio)) {
      return false;
    }

    // check if enough stonks to sell
    if (this._portfolio[stonk.symbol] < amount) {
      return false;
    }

    // add funds and remove stonks from portfolio
    this._funds += stonk.price * amount;
    this._portfolio[stonk.symbol] -= amount;

    return true;
  }
}

export default Player;
