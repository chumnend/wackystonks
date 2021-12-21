import * as chai from 'chai';

import { Game, Player } from '../../src/assets';
import { GameConfiguration } from '../../src/types';

const expect = chai.expect;

const testConfig: GameConfiguration = {
  tickTimerDelay: 100,
  prepTimerDelay: 500,
  gameTimerDelay: 500,
  initialFunds: 1000,
};

describe('Game', function () {
  it('expects to create new game instance', function () {
    const game = new Game('Test');

    expect(game.id).to.equal('Test');
    expect(game.status).to.equal(Game.STATUS_WAITING);
    expect(game.players).to.deep.equal([]);
  });

  it('expects to stop the game', function () {
    this.timeout(1000);

    const game = new Game('Test', testConfig);
    game.start();
    game.stop();

    expect(game.status).to.equal(Game.STATUS_STOPPED);
  });

  it('expects to change game status from waiting to stopped', function (done) {
    this.timeout(3000);

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
      done();
    }, 1100);
  });

  it('expects to subscribe to each tick', function (done) {
    this.timeout(3000);

    let ticks = 0;
    const game = new Game('Test', testConfig);
    game.subscribeToTick(() => ticks++);
    game.start();

    setTimeout(() => {
      expect(ticks).to.equal(9);
      done();
    }, 1000);
  });

  it('expects to add player to the game', function () {
    const game = new Game('Test', testConfig);
    expect(game.addPlayer('1234', 'player')).to.be.true;
    expect(game.players.length).to.equal(1);
    expect(game.players[0]).to.deep.equal(new Player('1234', 'player', 1000));
  });

  it('expects to not add a player that already exists', function () {
    const game = new Game('TEST');
    game.addPlayer('1234', 'player');
    expect(game.addPlayer('1234', 'player')).to.be.false;
  });

  it('expects to remove a player', function () {
    const game = new Game('TEST', testConfig);
    game.addPlayer('1234', 'player');
    expect(game.removePlayer('1234')).to.be.true;
    expect(game.players.length).to.equal(0);
  });

  it('expects to not remove a player that does not exist', function () {
    const game = new Game('TEST', testConfig);
    expect(game.removePlayer('1234')).to.be.false;
  });
});
