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

  it('expects pause to stop timer from finishing', (done) => {
    const timer = new Timer(() => done('test failed'), 100);
    expect(timer.start()).to.be.true;
    setTimeout(() => expect(timer.pause()).to.be.true, 50);
    setTimeout(() => done(), 150);
  });

  it('expects to not pause if already paused', (done) => {
    const timer = new Timer(() => done('test failed'), 100);
    expect(timer.start()).to.be.true;
    setTimeout(() => expect(timer.pause()).to.be.true, 50);
    setTimeout(() => expect(timer.pause()).to.be.false, 80);
    setTimeout(() => done(), 150);
  });

  it('expects to loop through 3 times', (done) => {
    let counter = 0;
    const timer = new Timer(() => counter++, 100, true);
    expect(timer.start()).to.be.true;
    setTimeout(() => {
      timer.pause();
      expect(counter).to.equal(3);
      done();
    }, 310);
  });
});
