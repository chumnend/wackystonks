import * as chai from 'chai';

import { Stonk, Ticker } from '../src';

const expect = chai.expect;

describe('Ticker', function () {
  it('expects Ticker to be properly created', () => {
    const ticker = new Ticker('Test Ticker');
    expect(ticker.name).equal('Test Ticker');
    expect(ticker.getStonks()).to.have.length(0);
  });

  it('expects to create a new Stonk and add it to the Ticker', () => {
    const ticker = new Ticker('Test Ticker');
    expect(ticker.getStonks()).to.have.length(0);

    const res = ticker.createStonk('Test Stonk', 'TST', 1);
    expect(res).to.be.true;
    expect(ticker.getStonks()).to.have.length(1);
    expect(ticker.getStonks()[0]).to.have.property('name', 'Test Stonk');
    expect(ticker.getStonks()[0]).to.have.property('symbol', 'TST');
    expect(ticker.getStonks()[0]).to.have.property('price', 1);
    expect(ticker.getStonks()[0]).to.have.deep.property('previousPrices', [1]);
  });

  it('expects to not create a new Stonk if invalid intial price given', () => {
    const ticker = new Ticker('Test Ticker');
    expect(ticker.getStonks()).to.have.length(0);

    const res = ticker.createStonk('Test Stonk', 'TST', -1);
    expect(res).to.be.false;
  });

  it('expects to add Stonks to Ticker', () => {
    const ticker = new Ticker('Test Ticker');
    expect(ticker.getStonks()).to.have.length(0);

    const stonk = new Stonk('Test Stonk', 'TST', 1);
    ticker.addStonk(stonk);
    expect(ticker.getStonks()).to.have.length(1);
    expect(ticker.getStonks()[0]).to.have.property('name', 'Test Stonk');
    expect(ticker.getStonks()[0]).to.have.property('symbol', 'TST');
    expect(ticker.getStonks()[0]).to.have.property('price', 1);
    expect(ticker.getStonks()[0]).to.have.deep.property('previousPrices', [1]);
  });

  it('expects to find an added stonk', () => {
    const ticker = new Ticker('Test Ticker');
    const stonk = new Stonk('Test Stonk', 'TST', 1);
    ticker.addStonk(stonk);
    expect(ticker.findStonk('TST')).to.have.property('name', 'Test Stonk');
    expect(ticker.findStonk('TST')).to.have.property('symbol', 'TST');
    expect(ticker.findStonk('TST')).to.have.property('price', 1);
    expect(ticker.findStonk('TST')).to.have.deep.property('previousPrices', [1]);
  });

  it('expects to not find a stonk', () => {
    const ticker = new Ticker('Test Ticker');
    expect(ticker.findStonk('NIL')).to.be.null;
  });

  it('expects simulate to modify all the prices of the ticker', () => {
    const ticker = new Ticker('Test Ticker');
    const stonk1 = new Stonk('Test Stonk 1', 'TS1', 20.03);
    const stonk2 = new Stonk('Test Stonk 2', 'TS2', 3.15);
    ticker.addStonk(stonk1);
    ticker.addStonk(stonk2);

    const oldValues = ticker.getStonks();
    ticker.simulate();
    const newValues = ticker.getStonks();

    expect(newValues[0].price).to.not.equal(oldValues[0].price);
    expect(newValues[1].price).to.not.equal(oldValues[1].price);
  });
});
