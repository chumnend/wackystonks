import * as chai from 'chai';

import { Stonk } from '../src';

const expect = chai.expect;

describe('Stonk', function () {
  it('expects Stonk to be properly created', () => {
    const stonk = new Stonk('Test Stonk', 'TST', 10.0);

    expect(stonk.name).to.equal('Test Stonk');
    expect(stonk.symbol).to.equal('TST');
    expect(stonk.price).to.equal(10);
    expect(stonk.previousPrices).to.deep.equal([10]);
  });

  it('expects an error if invalid initial price is given', () => {
    expect(() => new Stonk('Test Stonk', 'TST', -1)).to.throw('invalid initial price');
  });

  it('expects an error if symbol has more than 4 characters', () => {
    expect(() => new Stonk('Test Stonk', 'FAILURE', 10.0)).to.throw(`"symbol" cannot exceed 4 characters`);
  });

  it('expects to modify price of the Stonk', () => {
    const stonk = new Stonk('Test Stonk', 'TST', 10.0);
    expect(stonk.price).to.equal(10);

    stonk.modifyPrice(1);
    expect(stonk.price).to.equal(11);
    expect(stonk.previousPrices).to.deep.equal([10, 11]);
  });

  it('expects price to be 0 if price is modified to be negative', () => {
    const stonk = new Stonk('Test Stonk', 'TST', 10.0);
    stonk.modifyPrice(-11);

    expect(stonk.price).to.equal(0);
  });

  it('expects the price history to not exceed a size of 100', () => {
    const stonk = new Stonk('Test Stonk', 'TST', 0);
    for (let i = 0; i < 200; i++) {
      stonk.modifyPrice(1);
    }

    expect(stonk.price).to.equal(200);
    expect(stonk.previousPrices.length).to.equal(100);
    expect(stonk.previousPrices[0]).to.equal(101);
    expect(stonk.previousPrices[stonk.previousPrices.length - 1]).to.equal(200);
  });
});
