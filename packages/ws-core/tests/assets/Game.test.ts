import * as chai from 'chai';

import { Game } from '../../src';

const expect = chai.expect;

describe('Game', function () {
  it('expects to create new game instance', function () {
    const game = new Game('Test');

    expect(game.id).to.equal('Test');
    expect(game.status).to.equal('waiting');
  });
});
