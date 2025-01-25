import chai from 'chai';
import { Socket, io } from 'socket.io-client';
import { GameType } from 'ws-core';

import app from '../src/app';
import { SocketEvents } from '../src/socket/constants';

const expect = chai.expect;

describe('Socket', () => {
  let clientSocket: Socket;

  beforeEach((done) => {
    app.listen(3001, () => {
      clientSocket = io('http://localhost:3001');
      clientSocket.on('connect', done);
    });
  });

  afterEach(() => {
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
      clientSocket.emit(SocketEvents.CREATE_GAME, {}, (gameId: string) => {
        expect(gameId).to.be.string;
        done();
      });
    });
  });

  describe(SocketEvents.FIND_GAME, () => {
    it('expects to find a game', (done) => {
      clientSocket.emit(SocketEvents.CREATE_GAME, {}, (gameId: string) => {
        clientSocket.emit(SocketEvents.FIND_GAME, { gameId }, (state: GameType) => {
          expect(state).to.exist;
          done();
        });
      });
    });

    it('expects not to find a game', (done) => {
      clientSocket.emit(SocketEvents.FIND_GAME, { gameId: 'test_id' }, (state: GameType) => {
        expect(state).to.be.null;
        done();
      });
    });
  });

  describe(SocketEvents.JOIN_GAME, () => {
    it('expects to join a game', (done) => {
      clientSocket.emit(SocketEvents.CREATE_GAME, {}, (gameId: string) => {
        clientSocket.emit(
          SocketEvents.JOIN_GAME,
          {
            gameId,
            playerId: 'TSTR',
            playerName: 'Tester',
          },
          (state: GameType) => {
            expect(state).to.exist;
            done();
          },
        );
      });
    });

    it('expects not to find a game', (done) => {
      clientSocket.emit(
        SocketEvents.JOIN_GAME,
        { gameId: 'test_id', playerId: 'TSTR', playerName: 'Tester' },
        (state: GameType) => {
          expect(state).to.be.null;
          done();
        },
      );
    });
  });

  describe(SocketEvents.START_GAME, () => {
    it('expects to start a game', (done) => {
      clientSocket.emit(SocketEvents.CREATE_GAME, {}, (gameId: string) => {
        clientSocket.emit(SocketEvents.START_GAME, { gameId }, (success: boolean) => {
          expect(success).to.be.true;
          done();
        });
      });
    });

    it('expects to be unable to start a game', (done) => {
      clientSocket.emit(SocketEvents.START_GAME, { gameId: 'TST' }, (success: boolean) => {
        expect(success).to.be.false;
        done();
      });
    });
  });

  describe(SocketEvents.LEAVE_GAME, () => {
    it('expects to leave a game', (done) => {
      clientSocket.emit(SocketEvents.CREATE_GAME, {}, (gameId: string) => {
        clientSocket.emit(
          SocketEvents.JOIN_GAME,
          {
            gameId,
            playerId: 'TSTR',
            playerName: 'Tester',
          },
          (state: GameType) => {
            clientSocket.emit(SocketEvents.LEAVE_GAME, { gameId, playerId: 'TSTR' }, (success: boolean) => {
              expect(success).to.be.true;
              done();
            });
          },
        );
      });
    });

    it('expects to not be able to leave a game', (done) => {
      clientSocket.emit(SocketEvents.LEAVE_GAME, { gameId: 'TST', playerId: 'TSTR' }, (success: boolean) => {
        expect(success).to.be.false;
        done();
      });
    });
  });

  describe(SocketEvents.BUY_STONK, () => {
    it('expects to buy a stonk', (done) => {
      clientSocket.emit(SocketEvents.CREATE_GAME, {}, (gameId: string) => {
        clientSocket.emit(
          SocketEvents.JOIN_GAME,
          {
            gameId,
            playerId: 'TSTR',
            playerName: 'Tester',
          },
          (state: GameType) => {
            const stonk = state.stonks[0];
            clientSocket.emit(
              SocketEvents.BUY_STONK,
              { gameId, playerId: 'TSTR', symbol: stonk.symbol, amount: 1 },
              (success: boolean) => {
                expect(success).to.be.true;
                done();
              },
            );
          },
        );
      });
    });

    it('expects to not be able to buy a stonk', (done) => {
      clientSocket.emit(
        SocketEvents.BUY_STONK,
        { gameId: 'TST', playerId: 'TSTR', symbol: 'TST', amount: 1 },
        (success: boolean) => {
          expect(success).to.be.false;
          done();
        },
      );
    });
  });

  describe(SocketEvents.SELL_STONK, () => {
    it('expects to sell a stonk', (done) => {
      clientSocket.emit(SocketEvents.CREATE_GAME, {}, (gameId: string) => {
        clientSocket.emit(
          SocketEvents.JOIN_GAME,
          {
            gameId,
            playerId: 'TSTR',
            playerName: 'Tester',
          },
          (state: GameType) => {
            const stonk = state.stonks[0];
            clientSocket.emit(
              SocketEvents.BUY_STONK,
              { gameId, playerId: 'TSTR', symbol: stonk.symbol, amount: 1 },
              (success: boolean) => {
                clientSocket.emit(
                  SocketEvents.SELL_STONK,
                  { gameId, playerId: 'TSTR', symbol: stonk.symbol, amount: 1 },
                  (success: boolean) => {
                    expect(success).to.be.true;
                    done();
                  },
                );
              },
            );
          },
        );
      });
    });

    it('expects to not be able to sell a stonk', (done) => {
      clientSocket.emit(
        SocketEvents.SELL_STONK,
        { gameId: 'TST', playerId: 'TSTR', symbol: 'TST', amount: 1 },
        (success: boolean) => {
          expect(success).to.be.false;
          done();
        },
      );
    });
  });
});
