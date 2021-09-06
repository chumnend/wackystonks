import * as chai from 'chai';

import { Stonk, Ticker } from '../src';

const expect = chai.expect;

describe('Ticker', () => {
  it('expects Ticker to be properly created', () => {
    const ticker = new Ticker('Test Ticker');

    expect(ticker.getName()).equal('Test Ticker');
    expect(ticker.getStonks()).to.have.length(0);
  });

  it('expects to add Stonks to Ticker', () => {
    const ticker = new Ticker('Test Ticker');
    expect(ticker.getStonks()).to.have.length(0);

    const stonk = new Stonk('Test Stonk', 'TST', 1);
    ticker.addStonk(stonk);
    expect(ticker.getStonks()).to.have.length(1);
  });
});
