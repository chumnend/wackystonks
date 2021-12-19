import * as chai from 'chai';

import { Timer } from '../../src';

const expect = chai.expect;

describe('Timer - Countdown', function () {
  it('expects to call done after 100ms', function (done) {
    this.timeout(200);

    const timerFn = () => done();
    const timer = new Timer(timerFn, 100, Timer.COUNTDOWN);
    expect(timer.start()).to.be.true;
  });

  it('expects to not start twice', function (done) {
    this.timeout(200);

    const timerFn = () => done();
    const timer = new Timer(timerFn, 100, Timer.COUNTDOWN);
    expect(timer.start()).to.be.true;
    expect(timer.start()).to.be.false;
  });

  it('expects stop to timer from finishing', function (done) {
    this.timeout(200);

    const timerFn = () => done('stop did not stop the timer');
    const timer = new Timer(timerFn, 100, Timer.COUNTDOWN);
    expect(timer.start()).to.be.true;
    setTimeout(() => expect(timer.stop()).to.be.true, 50);
    setTimeout(() => done(), 150);
  });

  it('expects to not stop if already stopped', function (done) {
    this.timeout(200);

    const timerFn = () => done('stop did not stop the timer');
    const timer = new Timer(timerFn, 100, Timer.COUNTDOWN);
    expect(timer.start()).to.be.true;
    setTimeout(() => expect(timer.stop()).to.be.true, 50);
    setTimeout(() => expect(timer.stop()).to.be.false, 80);
    setTimeout(() => done(), 150);
  });

  it('expects reset to stop the timer', function (done) {
    this.timeout(200);

    const timerFn = () => done('reset did not stop the timer');
    const timer = new Timer(timerFn, 100, Timer.COUNTDOWN);
    expect(timer.start()).to.be.true;
    setTimeout(() => expect(timer.reset()).to.be.true, 50);
    setTimeout(() => done(), 150);
  });

  it('expects reset to restart timer from initial delay', function (done) {
    this.timeout(200);

    let count = 0;
    const timerFn = () => count++;
    const timer = new Timer(timerFn, 100, Timer.COUNTDOWN);
    expect(timer.start()).to.be.true;

    // restart and resume the timer after 30 ms
    setTimeout(() => {
      expect(timer.reset()).to.be.true;
      expect(timer.start()).to.be.true;
    }, 30);

    // after 100ms count should still be 0
    setTimeout(() => {
      expect(count).to.equal(0);
    }, 100);

    // after 150ms, count should be 1 as timer completed
    setTimeout(() => {
      expect(count).to.equal(1);
      done();
    }, 150);
  });

  it('expects checkTime to return time left on timer', function (done) {
    this.timeout(200);

    const timerFn = () => done();
    const timer = new Timer(timerFn, 100, Timer.COUNTDOWN);
    expect(timer.checkTime()).to.equal(100);
    expect(timer.start()).to.be.true;

    setTimeout(() => {
      // Time left should be 75 +/- 1ms
      expect(timer.checkTime()).to.be.at.least(73).and.to.be.below(78);
    }, 25);

    setTimeout(() => {
      expect(timer.stop()).to.be.true;
      // Time left should be 50 +/- 1ms
      expect(timer.checkTime()).to.be.at.least(48).and.to.be.below(53);
      expect(timer.start()).to.be.true;
    }, 50);
  });
});

// the only difference with a LOOPED vs COUNTDOWN timer is that the LOOPED should run until stopped
describe('Timer - Looped', function () {
  it('expects to loop through 3 times', function (done) {
    this.timeout(200);

    let count = 0;
    const timerFn = () => count++;
    const timer = new Timer(timerFn, 50, Timer.LOOPED);
    expect(timer.start()).to.be.true;
    setTimeout(() => {
      expect(timer.stop()).to.be.true;
      expect(count).to.equal(3);
      done();
    }, 160);
  });
});
