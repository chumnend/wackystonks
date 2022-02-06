import * as chai from 'chai';

import { Game, Player } from '../../src/assets';
import { ConfigurationType } from '../../src/types';

const expect = chai.expect;

const testConfiguration: ConfigurationType = {
  tickTimerDelay: 100,
  simulationDelay: 100,
  prepTimerDelay: 500,
  gameTimerDelay: 500,
  initialFunds: 1000,
  numberOfStonks: 1,
};

describe('Game', function () {
  it('expects to create new game instance', function () {
    const game = new Game('Test', testConfiguration);

    expect(game.id).to.equal('Test');
    expect(game.status).to.equal(Game.STATUS_WAITING);
    expect(game.host).to.equal('');
    expect(game.players).to.deep.equal([]);
    expect(game.stonks).to.have.length(1);
  });

  it('expects to stop the game', function () {
    this.timeout(1000);

    const game = new Game('Test', testConfiguration);
    game.startGame();
    game.stopGame();

    expect(game.status).to.equal(Game.STATUS_STOPPED);
  });

  it('expects to change game status from waiting to stopped', function (done) {
    this.timeout(1500);

    const game = new Game('Test', testConfiguration);
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
    const game = new Game('Test', testConfiguration);
    expect(game.addPlayer('1234', 'player')).to.be.true;
    expect(game.host).to.equal('1234');
    expect(game.players.length).to.equal(1);
    expect(game.players[0]).to.deep.equal(new Player('1234', 'player', 1000));
  });

  it('expects to not add a player that already exists', function () {
    const game = new Game('TEST');
    game.addPlayer('1234', 'player');
    expect(game.addPlayer('1234', 'player')).to.be.false;
  });

  it('expects to add multiple player to the game', function () {
    const game = new Game('Test', testConfiguration);
    expect(game.addPlayer('1234', 'player1')).to.be.true;
    expect(game.addPlayer('5678', 'player2')).to.be.true;
    expect(game.addPlayer('9123', 'player3')).to.be.true;
    expect(game.host).to.equal('1234');
    expect(game.players.length).to.equal(3);
    expect(game.players[0]).to.deep.equal(new Player('1234', 'player1', 1000));
    expect(game.players[1]).to.deep.equal(new Player('5678', 'player2', 1000));
    expect(game.players[2]).to.deep.equal(new Player('9123', 'player3', 1000));
  });

  it('expects to remove a player', function () {
    const game = new Game('TEST', testConfiguration);
    game.addPlayer('1234', 'player');
    expect(game.removePlayer('1234')).to.be.true;
    expect(game.host).to.equal('');
    expect(game.players.length).to.equal(0);
  });

  it('expects to not remove a player that does not exist', function () {
    const game = new Game('TEST', testConfiguration);
    expect(game.removePlayer('1234')).to.be.false;
  });

  it('expects to buy stonk', () => {
    const game = new Game('TEST', testConfiguration);
    game.addPlayer('TST', 'Tester');
    const stonk = game.stonks[0];
    expect(game.buyStonk('TST', stonk.symbol, 1)).to.be.true;
  });

  it('expects to not buy if player does not exist', () => {
    const game = new Game('TEST', testConfiguration);
    const stonk = game.stonks[0];
    expect(game.buyStonk('TST', stonk.symbol, 1)).to.be.false;
  });

  it('expects to not buy if stonk does not exist', () => {
    const game = new Game('TEST', testConfiguration);
    game.addPlayer('TST', 'Tester');
    expect(game.buyStonk('TST', 'RNDO', 1)).to.be.false;
  });

  it('expects to not buy if player does not have enough funds', () => {
    const game = new Game('TEST', testConfiguration);
    game.addPlayer('TST', 'Tester');
    const stonk = game.stonks[0];
    expect(game.buyStonk('TST', stonk.symbol, 10000)).to.be.false;
  });

  it('expects to sell stonk', () => {
    const game = new Game('TEST', testConfiguration);
    game.addPlayer('TST', 'Tester');
    const stonk = game.stonks[0];
    expect(game.buyStonk('TST', stonk.symbol, 1)).to.be.true;
    expect(game.sellStonk('TST', stonk.symbol, 1)).to.be.true;
  });

  it('expects to not sell stonk if player does not exist', () => {
    const game = new Game('TEST', testConfiguration);
    const stonk = game.stonks[0];
    expect(game.sellStonk('TST', stonk.symbol, 1)).to.be.false;
  });

  it('expects to not sell if stonk does not exist', () => {
    const game = new Game('TEST', testConfiguration);
    game.addPlayer('TST', 'Tester');
    expect(game.sellStonk('TST', 'RNDO', 1)).to.be.false;
  });

  it('expects to not sell stonk if player does not own stonk', () => {
    const game = new Game('TEST', testConfiguration);
    game.addPlayer('TST', 'Tester');
    const stonk = game.stonks[0];
    expect(game.sellStonk('TST', stonk.symbol, 1)).to.be.false;
  });

  it('expects to not sell stonk if player does not own enough stonk', () => {
    const game = new Game('TEST', testConfiguration);
    game.addPlayer('TST', 'Tester');
    const stonk = game.stonks[0];
    expect(game.buyStonk('TST', stonk.symbol, 1)).to.be.true;
    expect(game.sellStonk('TST', stonk.symbol, 2)).to.be.false;
  });

  it('expects to subscribe to each game event', function (done) {
    this.timeout(1500);

    let counter = 0;
    const increment = () => counter++;

    const game = new Game('Test', testConfiguration);
    game.listenForGameEvents(increment);
    game.startGame();

    setTimeout(() => {
      expect(counter).to.equal(14); // 9 tick events + 1 start event + 4 simulation events
      done();
    }, 1000);
  });

  it('expects to get game information', function () {
    const game = new Game('Test', testConfiguration);
    game.addPlayer('TST', 'Tester');

    const state = game.gameState();
    expect(state.id).to.equal('Test');
    expect(state.status).to.equal(Game.STATUS_WAITING);
    expect(state.players[0]).to.deep.equal({
      id: 'TST',
      name: 'Tester',
      portfolio: {},
      funds: 1000,
      netValue: 1000,
    });
    expect(state.stonks[0]).to.deep.equal({
      name: game.stonks[0].name,
      symbol: game.stonks[0].symbol,
      price: game.stonks[0].price,
      previousPrices: game.stonks[0].previousPrices,
    });
    expect(state.timeLeft).to.equal(0);
  });

  it('expects to ', function (done) {
    this.timeout(1500);

    const game = new Game('Test', testConfiguration);
    game.startGame();

    setTimeout(() => {
      expect(game.status).to.equal(Game.STATUS_PREPARING);
      const state = game.gameState();
      expect(state.timeLeft).to.be.at.least(395).and.to.be.below(405);
    }, 100);

    setTimeout(() => {
      expect(game.status).to.equal(Game.STATUS_PLAYING);
      const state = game.gameState();
      expect(state.timeLeft).to.be.at.least(395).and.to.be.below(405);
    }, 600);

    setTimeout(() => {
      expect(game.status).to.equal(Game.STATUS_STOPPED);
      const state = game.gameState();
      expect(state.timeLeft).to.equal(0);
      done();
    }, 1100);
  });
});
