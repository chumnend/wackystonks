import round from './utils/round';

class Stonk {
  private name: string;
  private symbol: string;
  private price: number;
  private priceHistory: number[];

  constructor(name: string, symbol: string, initialPrice: number) {
    this.name = name;
    this.symbol = symbol;
    if (initialPrice >= 0) {
      this.price = Math.round(initialPrice * 100) / 100;
      this.priceHistory = [this.price];
    } else {
      throw new Error('invalid initial price');
    }
  }

  public getName(): string {
    return this.name;
  }

  public getSymbol(): string {
    return this.symbol;
  }

  public getPrice(): number {
    return this.price;
  }

  public getPriceHistory(): number[] {
    return [...this.priceHistory];
  }

  public setPriceHistory(priceHistory: number[]): void {
    this.priceHistory = [...priceHistory];
  }

  public modifyPrice(value: number): void {
    const newPrice = round(this.price + value, 2);
    this.price = newPrice > 0 ? newPrice : 0;
    this.priceHistory.push(this.price);
  }

  public clone(): Stonk {
    const clonedStonk = new Stonk(this.name, this.symbol, this.price);
    clonedStonk.setPriceHistory(this.priceHistory);
    return clonedStonk;
  }
}

export default Stonk;
