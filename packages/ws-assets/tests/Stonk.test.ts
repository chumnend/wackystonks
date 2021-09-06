import * as chai from 'chai';

import { Stonk } from '../src';

const expect = chai.expect;

describe('Stonk', () => {
  it('expects Stonk to be properly created', () => {
    const stonk = new Stonk('Test Stonk', 'TST', 10.0);

    expect(stonk.getName()).to.equal('Test Stonk');
    expect(stonk.getSymbol()).to.equal('TST');
    expect(stonk.getPrice()).to.equal(10);
  });

  it('expects to modify price of the Stonk', () => {
    const stonk = new Stonk('Test Stonk', 'TST', 10.0);
    expect(stonk.getPrice()).to.equal(10);

    stonk.modifyPrice(1);
    expect(stonk.getPrice()).to.equal(11);
  });

  it('expects price to be 0 if price is modified to be negative', () => {
    const stonk = new Stonk('Test Stonk', 'TST', 10.0);
    stonk.modifyPrice(-11);

    expect(stonk.getPrice()).to.equal(0);
  });

  it('expects an error if invalid initial price is given', () => {
    expect(() => new Stonk('Test Stonk', 'TST', -1)).to.throw('invalid initial price');
  });
});
