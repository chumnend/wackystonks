import round from './utils/round';

class Stonk {
  private name: string;
  private symbol: string;
  private price: number;

  constructor(name: string, symbol: string, initialPrice: number) {
    this.name = name;
    this.symbol = symbol;
    if (initialPrice >= 0) {
      this.price = Math.round(initialPrice * 100) / 100;
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

  public modifyPrice(value: number): void {
    const newPrice = round(this.price + value, 2);
    this.price = newPrice > 0 ? newPrice : 0;
  }

  public clone(): Stonk {
    return new Stonk(this.name, this.symbol, this.price);
  }
}

export default Stonk;
