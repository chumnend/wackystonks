import * as chai from 'chai';

import { Game, Player, Ticker, Timer } from '../src';

const expect = chai.expect;

describe('Game', function () {
  it('expects to create new game', function () {
    const game = new Game('TEST');

    expect(game.id).to.equal('TEST');
    expect(game.status).to.equal(Game.STATUS_PARTY);
    expect(game.players).to.deep.equal([]);
    expect(game.ticker).to.be.instanceOf(Ticker);
    expect(game.ticker.getStonks()).to.have.length(5);
    expect(game.simulationTimer).to.be.instanceOf(Timer);
    expect(game.gameTimer).to.be.instanceOf(Timer);
  });

  it('expects to create new game with no stonks', function () {
    const game = new Game('TEST', Game.DEFAULT_GAME_TIMER_INTERVAL, Game.DEFAULT_TICKER_SIMULATION_INTERVAL, 0);

    expect(game.id).to.equal('TEST');
    expect(game.status).to.equal(Game.STATUS_PARTY);
    expect(game.players).to.deep.equal([]);
    expect(game.ticker).to.be.instanceOf(Ticker);
    expect(game.ticker.getStonks()).to.have.length(0);
    expect(game.simulationTimer).to.be.instanceOf(Timer);
  });

  it('expects to start game and subscribe to game simulation timer', function (done) {
    this.timeout(1000);

    let counter1 = 0;
    let counter2 = 0;
    const increment1 = () => counter1++;
    const increment2 = () => counter2++;

    const game = new Game('TEST', Game.DEFAULT_GAME_TIMER_INTERVAL, 75);
    game.subscribe(increment1);
    game.subscribe(increment2);
    game.unsubscribe(increment2);
    game.start();

    setTimeout(() => {
      game.stop();
      expect(counter1).to.equal(1);
      expect(counter2).to.equal(0);
      done();
    }, 100);
  });

  it('expects to add a new player', function () {
    const game = new Game('TEST');
    expect(game.addPlayer('1234', 'player')).to.be.true;
    expect(game.players.length).to.equal(1);
    expect(game.players[0]).to.deep.equal(new Player('1234', 'player'));
  });

  it('expects to not add a player that already exists', function () {
    const game = new Game('TEST');
    game.addPlayer('1234', 'player');
    expect(game.addPlayer('1234', 'player')).to.be.false;
  });

  it('expects to remove a player', function () {
    const game = new Game('TEST');
    game.addPlayer('1234', 'player');
    expect(game.removePlayer('1234')).to.be.true;
    expect(game.players.length).to.equal(0);
  });

  it('expects to not remove a player that does not exist', function () {
    const game = new Game('TEST');
    expect(game.removePlayer('1234')).to.be.false;
  });

  it('expects to return current game state', function () {
    const game = new Game('TEST');
    game.addPlayer('TST', 'Tester');
    const gameState = game.getGameState();
    expect(game.id).to.equal(gameState.id);
    expect(game.status).to.equal(gameState.status);
    expect(game.players[0].getPlayerInfo(game.ticker.getStonks())).to.deep.equal(gameState.players[0]);
    expect(game.ticker.getStonks()).to.deep.equal(gameState.stonks);
  });
});
