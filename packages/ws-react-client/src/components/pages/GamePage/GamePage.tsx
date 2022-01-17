import { useState, useEffect } from 'react';
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
  const history = useHistory();
  const params = useParams<ParamsType>();
  const socket = useSocket();

  const joinGame = () => {
    setLoading(true);
    const [playerId, playerName] = getPlayerInfo();
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
  };

  const leaveGame = () => {
    const [playerId, _] = getPlayerInfo();
    socket.emit(SocketEvents.LEAVE_GAME, { gameId: params.id, playerId });
    history.push(Routes.HOME_ROUTE);
  };

  const startGame = () => {
    socket.emit(SocketEvents.START_GAME, { gameId: params.id }, (success: boolean) => {
      if (!success) {
        // TODO: Handle error better
        alert('Unable to start game');
      }
    });
  };

  const addSocketListeners = () => {
    socket.on(SocketEvents.PLAYERS_UPDATE, (game: GameType) => {
      setPlayers(game.players);
    });

    socket.on(SocketEvents.STATUS_UPDATE, (game: GameType) => {
      setStatus(game.status);
    });

    socket.on(SocketEvents.STONKS_UPDATE, (game: GameType) => {
      setStonks(game.stonks);
    });
  };

  const removeSocketListeners = () => {
    socket.off(SocketEvents.PLAYERS_UPDATE);
    socket.off(SocketEvents.STATUS_UPDATE);
    socket.off(SocketEvents.STONKS_UPDATE);
  };

  useEffect(() => {
    joinGame();
    addSocketListeners();

    return () => {
      leaveGame();
      removeSocketListeners();
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  let content;
  switch (status) {
    case Game.STATUS_WAITING:
      content = (
        <Lobby socketId={socket.id} code={params.id} players={players} startGame={startGame} leaveGame={leaveGame} />
      );
      break;
    case Game.STATUS_PREPARING:
      content = <Preparation />;
      break;
    case Game.STATUS_PLAYING:
      content = <Session />;
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
