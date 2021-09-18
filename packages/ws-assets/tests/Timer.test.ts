import * as chai from 'chai';

import { Timer } from '../src';

const expect = chai.expect;

describe('Timer', function () {
  this.timeout(3000);

  it('expects to call done after 100ms', (done) => {
    const timer = new Timer(() => done(), 100);
    timer.resume();
  });

  it('expects pause to stop timer from finishing', (done) => {
    const timer = new Timer(() => done('Test Failed'), 100); // if finishes, tests fails
    timer.resume();

    setTimeout(() => timer.pause(), 50); // should stop timer
    setTimeout(() => done(), 150); // if finishes, tests succeeds
  });
});
