import * as chai from 'chai';

import { Game } from '../../src';

const expect = chai.expect;

describe('Game', function () {
  it('expects to create new game instance', function () {
    const game = new Game('Test');

    expect(game.id).to.equal('Test');
    expect(game.status).to.equal(Game.STATUS_WAITING);
  });

  it('expects to stop the game', function () {
    this.timeout(1000);

    const testConfig = {
      tickTimerDelay: 100,
      prepTimerDelay: 500,
      gameTimerDelay: 500,
    };

    const game = new Game('Test', testConfig);
    game.start();
    game.stop();

    expect(game.status).to.equal(Game.STATUS_STOPPED);
  });

  it('expects to change game status from waiting to stopped', function (done) {
    this.timeout(3000);

    const testConfig = {
      tickTimerDelay: 100,
      prepTimerDelay: 500,
      gameTimerDelay: 500,
    };

    const game = new Game('Test', testConfig);
    game.start();

    setTimeout(() => {
      expect(game.status).to.equal(Game.STATUS_PREPARING);
    }, 100);

    setTimeout(() => {
      expect(game.status).to.equal(Game.STATUS_PLAYING);
    }, 600);

    setTimeout(() => {
      expect(game.status).to.equal(Game.STATUS_STOPPED);
      game.stop();
      done();
    }, 1100);
  });

  it('expects to subscribe to each tick', function (done) {
    this.timeout(3000);

    const testConfig = {
      tickTimerDelay: 100,
      prepTimerDelay: 500,
      gameTimerDelay: 500,
    };

    let ticks = 0;
    const game = new Game('Test', testConfig);
    game.subscribeToTick(() => ticks++);
    game.start();

    setTimeout(() => {
      expect(ticks).to.equal(9);
      done();
    }, 1000);
  });
});
