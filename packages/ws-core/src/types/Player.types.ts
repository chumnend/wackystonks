export type PortfolioType = {
  [key: string]: number;
};

export interface IPlayer {
  /** An identifier used to represent a player */
  id: string;
  /** Name of a player */
  name: string;
  /** Details of a player's stonk portfolio */
  portfolio: PortfolioType;
  /** The amount of mony a player has */
  funds: number;
  /** Add an amount of stonk to portfolio */
  addToPortfolio(symbol: string, amount: number): boolean;
  /** Remove an amount from portfolio */
  removeFromPortfolio(symbol: string, amount: number): boolean;
}
