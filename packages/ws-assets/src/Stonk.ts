class Stonk {
  private name: string;
  private symbol: string;
  private price: number;

  constructor(name: string, symbol: string, initialPrice: number) {
    this.name = name;
    this.symbol = symbol;
    if (initialPrice >= 0) {
      this.price = initialPrice;
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
    const newPrice = this.price + value;
    this.price = newPrice > 0 ? newPrice : 0;
  }
}

export default Stonk;
