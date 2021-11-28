import * as chai from 'chai';

import { Timer } from '../src';

const expect = chai.expect;

describe('Timer', function () {
  this.timeout(1000);

  it('expects to call done after 100ms', (done) => {
    const timer = new Timer(() => done(), 100);
    expect(timer.start()).to.be.true;
  });

  it('expects to not start twice', (done) => {
    const timer = new Timer(() => done(), 100);
    expect(timer.start()).to.be.true;
    expect(timer.start()).to.be.false;
  });

  it('expects stop to stop timer from finishing', (done) => {
    const timer = new Timer(() => done('test failed'), 100);
    expect(timer.start()).to.be.true;
    setTimeout(() => expect(timer.stop()).to.be.true, 50);
    setTimeout(() => done(), 150);
  });

  it('expects to not stop if already stopd', (done) => {
    const timer = new Timer(() => done('test failed'), 100);
    expect(timer.start()).to.be.true;
    setTimeout(() => expect(timer.stop()).to.be.true, 50);
    setTimeout(() => expect(timer.stop()).to.be.false, 80);
    setTimeout(() => done(), 150);
  });

  it('expects to loop through 3 times', (done) => {
    let counter = 0;
    const timer = new Timer(() => counter++, 100, Timer.LOOPED_TIMER);
    expect(timer.start()).to.be.true;
    setTimeout(() => {
      timer.stop();
      expect(counter).to.equal(3);
      done();
    }, 310);
  });

  it('expects reset to restart the timer from intial delay', (done) => {
    const timer = new Timer(() => done('test failed'), 100);
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
