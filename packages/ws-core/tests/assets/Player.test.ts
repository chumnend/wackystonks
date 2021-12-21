import * as chai from 'chai';

import { Player } from '../../src';

const expect = chai.expect;

describe('Player', function () {
  it('expects to create new player', function () {
    const player = new Player('TSTR-123', 'Chester Tester', 10000);
    expect(player.id).to.equal('TSTR-123');
    expect(player.name).to.equal('Chester Tester');
    expect(player.portfolio).to.deep.equal({});
    expect(player.funds).to.equal(10000);
  });

  it('expects to modify funds', function () {
    const player = new Player('TSTR-123', 'Chester Tester', 10000);
    player.funds = 1000;
    expect(player.funds).to.equal(1000);
    player.funds += 1000;
    expect(player.funds).to.equal(2000);
    player.funds -= 1000;
    expect(player.funds).to.equal(1000);
  });

  it('expects to add and remove stonks to thier portfolio', function () {
    const player = new Player('TSTR-123', 'Chester Tester', 10000);
    player.addToPortfolio('TST', 10);
    expect(player.portfolio).to.deep.equal({ TST: 10 });
    player.addToPortfolio('TST', 5);
    expect(player.portfolio).to.deep.equal({ TST: 15 });
    player.removeFromPortfolio('TST', 10);
    expect(player.portfolio).to.deep.equal({ TST: 5 });
    expect(player.removeFromPortfolio('TST', 10)).to.be.false;
    expect(player.removeFromPortfolio('ABC', 10)).to.be.false;
  });
});
