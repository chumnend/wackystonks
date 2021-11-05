import * as chai from 'chai';

import { Player } from '../src';

const expect = chai.expect;

describe('Player', function () {
  it('expects to create new player', function () {
    const player = new Player('TSTR-123', 'Chester Tester');
    expect(player.id).to.equal('TSTR-123');
    expect(player.name).to.equal('Chester Tester');
    expect(player.portfolio).to.deep.equal({});
  });

  it('expects to add/remove stonk record', function () {
    const player = new Player('TSTR-123', 'Chester Tester');

    // add new stonk
    player.addStonkToPortfolio('TST', 10);
    expect(player.portfolio).to.deep.equal({ TST: 10 });

    // add to existing stonk
    player.addStonkToPortfolio('TST', 5);
    expect(player.portfolio).to.deep.equal({ TST: 15 });

    // remove from existing
    player.removeStonkToPortfolio('TST', 5);
    expect(player.portfolio).to.deep.equal({ TST: 10 });

    // remove more stonk than exists
    player.removeStonkToPortfolio('TST', 100);
    expect(player.portfolio).to.deep.equal({ TST: 0 });

    // remove stonk that does not exist
    expect(player.removeStonkToPortfolio('ABC', 10)).to.be.false;
  });

  it('expects to get Object of Player information', function () {
    const player = new Player('TSTR-123', 'Chester Tester');
    const playerInfo = player.getPlayerInfo();
    expect(player.id).to.equal(playerInfo.id);
    expect(player.name).to.equal(playerInfo.name);
    expect(player.portfolio).to.deep.equal(playerInfo.portfolio);
  });
});
