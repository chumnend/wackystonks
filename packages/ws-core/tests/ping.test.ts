import * as chai from 'chai';

import { ping } from '../src/ping';

const expect = chai.expect;

describe('ping', function () {
  it('expects ping to return pong', function () {
    const result = ping();
    expect(result).to.equal('pong');
  });
});
