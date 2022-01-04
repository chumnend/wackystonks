import chai from 'chai';
import { Socket, io } from 'socket.io-client';

import app from '../src/app';

const expect = chai.expect;

describe('socket', () => {
  let clientSocket: Socket;

  before((done) => {
    app.listen(3001, () => {
      clientSocket = io('http://localhost:3001');
      clientSocket.on('connect', done);
    });
  });

  after(() => {
    clientSocket.close();
    app.close();
  });

  it('expects to get ok', (done) => {
    clientSocket.emit('ws:status', (arg: string) => {
      expect(arg).to.equal('OK');
      done();
    });
  });
});
