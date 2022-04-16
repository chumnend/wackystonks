import { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Game, GameType, PlayerType, StonkType } from 'ws-core';

import Error from '../Error';
import Loading from '../Loading';
import Lobby from '../Lobby';
import Preparation from '../Preparation';
import Session from '../Session';
import EndScreen from '../EndScreen';
import { useSocket } from '../../../providers/SocketProvider';
import { useToast } from '../../../providers/ToastProvider';
import { getPlayerInfo } from '../../../../helpers/utils';
import { ROUTES, SOCKET_EVENTS } from '../../../../helpers/constants';

interface ParamsType {
  id: string;
}

const GamePage = () => {
  const [status, setStatus] = useState<string>('');
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [stonks, setStonks] = useState<StonkType[]>([]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState<number>(0);
  const history = useHistory();
  const params = useParams<ParamsType>();
  const socket = useSocket();
  const { addMessage } = useToast();

  const joinGame = useCallback(() => {
    setLoading(true);
    const [playerId, playerName] = getPlayerInfo();
    socket.emit(SOCKET_EVENTS.JOIN_GAME, { gameId: params.id, playerId, playerName }, (game: GameType) => {
      if (!game) {
        addMessage(`Unable to find game: ${params.id}`);
        history.push(ROUTES.HOME_ROUTE);
        return;
      }
      setStatus(game.status);
      setPlayers(game.players);
      setStonks(game.stonks);
      setLoading(false);
    });
  }, [history, params.id, socket, addMessage]);

  const leaveGame = useCallback(() => {
    const [playerId] = getPlayerInfo();
    socket.emit(SOCKET_EVENTS.LEAVE_GAME, { gameId: params.id, playerId }, (success: boolean) => {
      if (success) {
        history.push(ROUTES.HOME_ROUTE);
      }
    });
  }, [history, params.id, socket]);

  const startGame = useCallback(() => {
    socket.emit(SOCKET_EVENTS.START_GAME, { gameId: params.id }, (success: boolean) => {
      if (!success) {
        addMessage(`Unable to start game: ${params.id}`);
      }
      setTimer(5); // TODO: On this needs to be populated using game state
    });
  }, [params.id, socket, addMessage]);

  const updateGame = useCallback((game: GameType) => {
    setStatus(game.status);
    setPlayers(game.players);
    setStonks(game.stonks);
    setTimer(Math.round(game.timeLeft / 1000)); // convert ms to s
  }, []);

  const addSocketListeners = useCallback(() => {
    socket.on(SOCKET_EVENTS.GAME_UPDATE, (game: GameType) => {
      updateGame(game);
    });

    socket.on(SOCKET_EVENTS.HOST_LEFT, () => {
      addMessage('Host has left the game');
      leaveGame();
    });
  }, [socket, updateGame, leaveGame, addMessage]);

  const removeSocketListeners = useCallback(() => {
    socket.off(SOCKET_EVENTS.GAME_UPDATE);
  }, [socket]);

  useEffect(() => {
    joinGame();
    addSocketListeners();

    return () => {
      leaveGame();
      removeSocketListeners();
    };
  }, [joinGame, leaveGame, addSocketListeners, removeSocketListeners]);

  if (loading) {
    return <Loading />;
  }

  let content;
  switch (status) {
    case Game.STATUS_WAITING:
      content = <Lobby code={params.id} players={players} startGame={startGame} leaveGame={leaveGame} />;
      break;
    case Game.STATUS_PREPARING:
      content = <Preparation timeLeft={timer} />;
      break;
    case Game.STATUS_PLAYING:
      content = (
        <Session
          code={params.id}
          players={players}
          stonks={stonks}
          startGame={startGame}
          leaveGame={leaveGame}
          timeLeft={timer}
        />
      );
      break;
    case Game.STATUS_STOPPED:
      content = <EndScreen />;
      break;
    default:
      content = <Error />;
  }
  return content;
};

export default GamePage;
