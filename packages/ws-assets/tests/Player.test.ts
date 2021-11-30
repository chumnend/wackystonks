import * as chai from 'chai';

import { Player, Stonk } from '../src';

const expect = chai.expect;

describe('Player', function () {
  it('expects to create new player', function () {
    const player = new Player('TSTR-123', 'Chester Tester', 10000);

    expect(player.id).to.equal('TSTR-123');
    expect(player.name).to.equal('Chester Tester');
    expect(player.portfolio).to.deep.equal({});
    expect(player.funds).to.equal(10000);
  });

  it('expects to get player information', () => {
    const stonk = new Stonk('Test', 'TST', 10);
    const stonks = [stonk.getInfo()];
    const player = new Player('TSTR-123', 'Chester Tester', 10000);
    const playerInfo = player.getInfo(stonks);

    expect(playerInfo.id).to.equal('TSTR-123');
    expect(playerInfo.name).to.equal('Chester Tester');
    expect(playerInfo.portfolio).to.deep.equal({});
    expect(playerInfo.netValue).to.equal(10000);
  });

  it('expects to purchase a stonk', () => {
    const player = new Player('TSTR-123', 'Chester Tester', 100);
    const stonk = new Stonk('Test', 'TST', 10);

    expect(player.buyStonk(stonk, 10)).to.be.true;
    expect(player.funds).to.equal(0);
    console.log(player.portfolio);
    expect(player.portfolio['TST']).to.equal(10);
  });

  it('expects to not purchase a stonk if not enough funds', () => {
    const player = new Player('TSTR-123', 'Chester Tester', 0);
    const stonk = new Stonk('Test', 'TST', 10);

    expect(player.buyStonk(stonk, 10)).to.be.false;
  });

  it('expects to sell a stonk', () => {
    const player = new Player('TSTR-123', 'Chester Tester', 10000);
    const stonk = new Stonk('Test', 'TST', 10);

    expect(player.buyStonk(stonk, 10)).to.be.true;
    expect(player.sellStonk(stonk, 10)).to.be.true;
  });

  it('expects to not sell a stonk, if player does not own a stonk', () => {
    const player = new Player('TSTR-123', 'Chester Tester', 10000);
    const stonk = new Stonk('Test', 'TST', 10);

    expect(player.sellStonk(stonk, 10)).to.be.false;
  });

  it('expects to not sell a stonk, if not enough of stonk', () => {
    const player = new Player('TSTR-123', 'Chester Tester', 10000);
    const stonk = new Stonk('Test', 'TST', 10);

    expect(player.buyStonk(stonk, 5)).to.be.true;
    expect(player.sellStonk(stonk, 10)).to.be.false;
  });
});
