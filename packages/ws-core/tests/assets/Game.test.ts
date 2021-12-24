import * as chai from 'chai';

import { Game, Player } from '../../src/assets';
import { GameConfiguration } from '../../src/types';

const expect = chai.expect;

const testConfig: GameConfiguration = {
  tickTimerDelay: 100,
  simulationDelay: 100,
  prepTimerDelay: 500,
  gameTimerDelay: 500,
  initialFunds: 1000,
  numberOfStonks: 1,
};

describe('Game', function () {
  it('expects to create new game instance', function () {
    const game = new Game('Test', testConfig);

    expect(game.id).to.equal('Test');
    expect(game.status).to.equal(Game.STATUS_WAITING);
    expect(game.players).to.deep.equal([]);
    expect(game.stonks).to.have.length(1);
  });

  it('expects to stop the game', function () {
    this.timeout(1000);

    const game = new Game('Test', testConfig);
    game.startGame();
    game.stopGame();

    expect(game.status).to.equal(Game.STATUS_STOPPED);
  });

  it('expects to change game status from waiting to stopped', function (done) {
    this.timeout(3000);

    const game = new Game('Test', testConfig);
    game.startGame();

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

  it('expects to buy stonk', () => {
    const game = new Game('TEST', testConfig);
    game.addPlayer('TST', 'Tester');
    const stonk = game.stonks[0];
    expect(game.buyStonk('TST', stonk.symbol, 1)).to.be.true;
  });

  it('expects to not buy if player does not exist', () => {
    const game = new Game('TEST', testConfig);
    const stonk = game.stonks[0];
    expect(game.buyStonk('TST', stonk.symbol, 1)).to.be.false;
  });

  it('expects to not buy if stonk does not exist', () => {
    const game = new Game('TEST', testConfig);
    game.addPlayer('TST', 'Tester');
    expect(game.buyStonk('TST', 'RNDO', 1)).to.be.false;
  });

  it('expects to not buy if player does not have enough funds', () => {
    const game = new Game('TEST', testConfig);
    game.addPlayer('TST', 'Tester');
    const stonk = game.stonks[0];
    expect(game.buyStonk('TST', stonk.symbol, 10000)).to.be.false;
  });

  it('expects to sell stonk', () => {
    const game = new Game('TEST', testConfig);
    game.addPlayer('TST', 'Tester');
    const stonk = game.stonks[0];
    expect(game.buyStonk('TST', stonk.symbol, 1)).to.be.true;
    expect(game.sellStonk('TST', stonk.symbol, 1)).to.be.true;
  });

  it('expects to not sell stonk if player does not exist', () => {
    const game = new Game('TEST', testConfig);
    const stonk = game.stonks[0];
    expect(game.sellStonk('TST', stonk.symbol, 1)).to.be.false;
  });

  it('expects to not sell if stonk does not exist', () => {
    const game = new Game('TEST', testConfig);
    game.addPlayer('TST', 'Tester');
    expect(game.sellStonk('TST', 'RNDO', 1)).to.be.false;
  });

  it('expects to not sell stonk if player does not own stonk', () => {
    const game = new Game('TEST', testConfig);
    game.addPlayer('TST', 'Tester');
    const stonk = game.stonks[0];
    expect(game.sellStonk('TST', stonk.symbol, 1)).to.be.false;
  });

  it('expects to not sell stonk if player does not own enough stonk', () => {
    const game = new Game('TEST', testConfig);
    game.addPlayer('TST', 'Tester');
    const stonk = game.stonks[0];
    expect(game.buyStonk('TST', stonk.symbol, 1)).to.be.true;
    expect(game.sellStonk('TST', stonk.symbol, 2)).to.be.false;
  });

  it('expects to subscribe to each tick event', function (done) {
    this.timeout(3000);

    let counter = 0;
    const increment = () => counter++;

    const game = new Game('Test', testConfig);
    game.listenForTickEvent(increment);
    game.startGame();

    setTimeout(() => {
      expect(counter).to.equal(9);
      done();
    }, 1000);
  });

  it('expects to subsribe to each simulation event', function (done) {
    this.timeout(3000);

    let counter = 0;
    const increment = () => counter++;

    const game = new Game('TEST', testConfig);
    const initialStonk = game.stonks[0];
    game.listenForSimulationEvent(increment);
    game.startGame();

    setTimeout(() => {
      game.stopGame();
      expect(counter).to.equal(1);
      const finalStonk = game.stonks[1];
      expect(initialStonk).to.not.deep.equal(finalStonk);
      done();
    }, 650);
  });
});
