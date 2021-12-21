import { IPlayer, Portfolio } from '../types';
import deepClone from '../utils/deepClone';

class Player implements IPlayer {
  private _id: string;
  private _name: string;
  private _portfolio: Portfolio;
  private _funds: number;

  constructor(id: string, name: string, funds: number) {
    this._id = id;
    this._name = name;
    this._portfolio = {};
    this._funds = funds;
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
   * @returns {Portfolio}
   */
  get portfolio(): Portfolio {
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
   * Set player's fund amount
   * @param {number} value
   */
  set funds(value: number) {
    this._funds = value;
  }

  /**
   * Add an amount of stonk to portfolio
   * @param symbol {string}
   * @param amount {number}
   */
  addToPortfolio(symbol: string, amount: number): boolean {
    if (symbol in this._portfolio) {
      this._portfolio[symbol] += amount;
    } else {
      this._portfolio[symbol] = amount;
    }
    return true;
  }

  /**
   *  Remove an amount from portfolio
   * @param symbol {string}
   * @param amount {number}
   */
  removeFromPortfolio(symbol: string, amount: number): boolean {
    // check if stonks in portfolio
    if (!(symbol in this._portfolio)) {
      return false;
    }

    // check if enough stonks to sell
    if (this._portfolio[symbol] < amount) {
      return false;
    }

    this._portfolio[symbol] -= amount;
    return true;
  }
}

export default Player;
