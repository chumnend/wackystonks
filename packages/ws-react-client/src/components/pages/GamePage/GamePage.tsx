import { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Game, GameType, PlayerType, StonkType } from 'ws-core';

import Error from './Error';
import Loading from './Loading';
import Lobby from './Lobby';
import Preparation from './Preparation';
import Session from './Session';
import EndScreen from './EndScreen';
import { useSocket } from '../../providers/SocketProvider';
import { getPlayerInfo } from '../../../helpers/playerInfo';
import * as SocketEvents from '../../../helpers/socketEvents';
import * as Routes from '../../../helpers/routes';

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
  const [playerId, playerName] = getPlayerInfo();

  const joinGame = useCallback(() => {
    setLoading(true);
    socket.emit(SocketEvents.JOIN_GAME, { gameId: params.id, playerId, playerName }, (game: GameType) => {
      if (!game) {
        // TODO: Handle faliure to find game better
        history.push(Routes.HOME_ROUTE);
        return;
      }
      setStatus(game.status);
      setPlayers(game.players);
      setStonks(game.stonks);
      setLoading(false);
    });
  }, [history, params.id, socket, playerId, playerName]);

  const leaveGame = useCallback(() => {
    const [playerId] = getPlayerInfo();
    socket.emit(SocketEvents.LEAVE_GAME, { gameId: params.id, playerId }, (success: boolean) => {
      if (success) {
        history.push(Routes.HOME_ROUTE);
      }
    });
  }, [history, params.id, socket]);

  const startGame = useCallback(() => {
    socket.emit(SocketEvents.START_GAME, { gameId: params.id }, (success: boolean) => {
      if (!success) {
        // TODO: Handle error better
        alert('Unable to start game');
      }
      setTimer(5); // TODO: On this needs to be populated using game state
    });
  }, [params.id, socket]);

  const updateGame = useCallback((game: GameType) => {
    setStatus(game.status);
    setPlayers(game.players);
    setStonks(game.stonks);
    setTimer(Math.round(game.timeLeft / 1000)); // convert ms to s
  }, []);

  const addSocketListeners = useCallback(() => {
    socket.on(SocketEvents.GAME_UPDATE, (game: GameType) => {
      updateGame(game);
    });

    socket.on(SocketEvents.HOST_LEFT, () => {
      alert('Host left the game :('); // TODO: Replace with alerts
      leaveGame();
    });
  }, [socket, updateGame, leaveGame]);

  const removeSocketListeners = useCallback(() => {
    socket.off(SocketEvents.GAME_UPDATE);
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
      content = <Preparation timer={timer} />;
      break;
    case Game.STATUS_PLAYING:
      content = (
        <Session code={params.id} players={players} stonks={stonks} startGame={startGame} leaveGame={leaveGame} />
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
