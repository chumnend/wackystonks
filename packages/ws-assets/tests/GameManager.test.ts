import * as chai from 'chai';

import { Game, GameManager } from '../src';

const expect = chai.expect;

describe('GameManager', function () {
  it('expects to create a game instance', function () {
    const manager = new GameManager();
    const game = manager.createGame();
    expect(game).to.be.instanceOf(Game);
  });

  it('expects to find created game instance', function () {
    const manager = new GameManager();
    const game = manager.createGame();
    const id = game.id;
    expect(manager.findGame(id)).to.equal(game);
    expect(manager.findGame(id)).to.deep.equal(game);
  });

  it('expects to not find unknown game instance', function () {
    const manager = new GameManager();
    expect(manager.findGame('1234')).to.equal(null);
  });

  it('expects to delete a created game', function () {
    const manager = new GameManager();
    const game = manager.createGame();
    const id = game.id;
    expect(manager.deleteGame(id)).to.be.true;
    expect(manager.findGame(id)).to.equal(null);
  });

  it('expects to not delete an unknown game', function () {
    const manager = new GameManager();
    expect(manager.deleteGame('1234')).to.be.false;
  });
});
