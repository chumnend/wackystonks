import * as chai from 'chai';

import { Player } from '../src';

const expect = chai.expect;

describe('Player', function () {
  it('expects to create new player', function () {
    const player = new Player('TSTR-123', 'Chester Tester');
    expect(player.id).to.equal('TSTR-123');
    expect(player.name).to.equal('Chester Tester');
  });
});
