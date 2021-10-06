import * as chai from 'chai';

import { Game, Ticker, Timer } from '../src';

const expect = chai.expect;

describe('Game', function () {
  it('expects to create new game', function () {
    const game = new Game('TEST');

    expect(game.id).to.equal('TEST');
    expect(game.ticker).to.deep.equal(new Ticker('TEST'));
    expect(game.timer).to.be.instanceOf(Timer);
  });

  it('expects to start game and subscribe to game timer', function (done) {
    this.timeout(1000);

    let counter1 = 0;
    let counter2 = 0;
    const increment1 = () => counter1++;
    const increment2 = () => counter2++;

    const game = new Game('TEST', 75);
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
});
