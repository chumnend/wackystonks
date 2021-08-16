import Stonk from './Stonk';

export const createStonk = (name: string, symbol: string, price: number): Stonk => {
  return new Stonk(name, symbol, price);
}
