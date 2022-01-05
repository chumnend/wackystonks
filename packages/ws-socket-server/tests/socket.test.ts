import chai from 'chai';
import { Socket, io } from 'socket.io-client';
import { GameType } from 'ws-core';

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

  describe(SocketEvents.CHECK_STATUS, () => {
    it('expects to get ok', (done) => {
      clientSocket.emit(SocketEvents.CHECK_STATUS, (message: string) => {
        expect(message).to.equal('OK');
        done();
      });
    });
  });

  describe(SocketEvents.CREATE_GAME, () => {
    it('expects to create a game', (done) => {
      clientSocket.emit(SocketEvents.CREATE_GAME, (gameId: string) => {
        expect(gameId).to.be.string;
        done();
      });
    });

    it('expects to do nothing if no callback is passed', (done) => {
      clientSocket.emit(SocketEvents.CREATE_GAME);
      done();
    });
  });

  describe(SocketEvents.FIND_GAME, () => {
    it('expects to find a game', (done) => {
      clientSocket.emit(SocketEvents.CREATE_GAME, (gameId: string) => {
        clientSocket.emit(SocketEvents.FIND_GAME, { id: gameId }, (state: GameType) => {
          expect(state).to.exist;
          done();
        });
      });
    });

    it('expects to not find a game', (done) => {
      clientSocket.emit(SocketEvents.FIND_GAME, { id: 'TEST' }, (state: GameType) => {
        expect(state).to.be.null;
        done();
      });
    });

    it('expects to do nothing if no callback is passed', (done) => {
      clientSocket.emit(SocketEvents.CREATE_GAME, (gameId: string) => {
        clientSocket.emit(SocketEvents.FIND_GAME, { id: gameId }, null);
        done();
      });
    });
  });
});
