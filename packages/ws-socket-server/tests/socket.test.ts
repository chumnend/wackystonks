import chai from 'chai';
import { Socket, io } from 'socket.io-client';

import app from '../src/app';
import { SocketEvents } from '../src/socket/constants';

const expect = chai.expect;

describe('Socket', () => {
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

  describe('ws:status', () => {
    it('expects to get ok', (done) => {
      clientSocket.emit(SocketEvents.CHECK_STATUS, (message: string) => {
        expect(message).to.equal('OK');
        done();
      });
    });
  });

  describe('ws:create-game', () => {
    it('expects to create a game', (done) => {
      clientSocket.emit(SocketEvents.CREATE_GAME, (gameId: string) => {
        expect(gameId).to.be.string;
        done();
      });
    });

    it('expects nothing to happen if no callback is passed', (done) => {
      clientSocket.emit(SocketEvents.CREATE_GAME);
      done();
    });
  });
});
