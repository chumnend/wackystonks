import * as chai from 'chai';

import { Timer } from '../src';

const expect = chai.expect;

describe('Timer - Countdown', function () {
  it('expects to call done after 100ms', function (done) {
    this.timeout(200);

    const timer = new Timer(() => done(), 100, Timer.COUNTDOWN_TIMER);
    expect(timer.start()).to.be.true;
  });

  it('expects to not start twice', function (done) {
    this.timeout(200);

    const timer = new Timer(() => done(), 100, Timer.COUNTDOWN_TIMER);
    expect(timer.start()).to.be.true;
    expect(timer.start()).to.be.false;
  });

  it('expects stop to timer from finishing', function (done) {
    this.timeout(200);

    const timer = new Timer(() => done('test failed'), 100, Timer.COUNTDOWN_TIMER);
    expect(timer.start()).to.be.true;
    setTimeout(() => expect(timer.stop()).to.be.true, 50);
    setTimeout(() => done(), 150);
  });

  it('expects to not stop if already stopped', function (done) {
    this.timeout(200);

    const timer = new Timer(() => done('test failed'), 100, Timer.COUNTDOWN_TIMER);
    expect(timer.start()).to.be.true;
    setTimeout(() => expect(timer.stop()).to.be.true, 50);
    setTimeout(() => expect(timer.stop()).to.be.false, 80);
    setTimeout(() => done(), 150);
  });

  it('expects reset to restart the timer from initial delay', function (done) {
    this.timeout(200);

    const timer = new Timer(() => done('test failed'), 100, Timer.COUNTDOWN_TIMER);
    expect(timer.start()).to.be.true;
    setTimeout(() => {
      expect(timer.reset()).to.be.true;
      expect(timer.start()).to.be.true;
    }, 80);
    setTimeout(() => {
      timer.stop();
      done();
    }, 150);
  });
});

describe('Timer - Looped', function () {
  it('expects to loop through 3 times', function (done) {
    this.timeout(200);

    let counter = 0;
    const timer = new Timer(() => counter++, 50, Timer.LOOPED_TIMER);
    expect(timer.start()).to.be.true;
    setTimeout(() => {
      timer.stop();
      expect(counter).to.equal(3);
      done();
    }, 160);
  });
});
