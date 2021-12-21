export interface IStonk {
  /** Name of a stonk */
  name: string;
  /** Symbol representing stonk (Max 4 characters) */
  symbol: string;
  /** Current value of a stonk */
  price: number;
  /** Log of previous prices (Up to 100 entries) */
  previousPrices: number[];
  /** Modify the value of a stonk */
  modifyPrice(value: number): void;
}
