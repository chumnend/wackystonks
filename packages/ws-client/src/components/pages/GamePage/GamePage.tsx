import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Game, GameState, PlayerInfo, StonkInfo } from 'ws-assets';

import Lobby from './Lobby';
import Error from './Error';
import Session from './Session';
import Loading from './Loading';
import { Routes, SocketEvents } from '../../../helpers/constants';
import { useSocket } from '../../providers/SocketProvider';

interface ParamTypes {
  id: string;
}

const GamePage = () => {
  const [status, setStatus] = useState<string>('');
  const [players, setPlayers] = useState<PlayerInfo[]>([]);
  const [stonks, setStonks] = useState<StonkInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const params = useParams<ParamTypes>();
  const socket = useSocket();

  const joinGame = () => {
    setLoading(true);
    socket.emit(SocketEvents.JOIN_GAME, { id: params.id }, (game: GameState) => {
      if (!game) {
        // TODO: Handle faliure to find game better
        history.push(Routes.HOME_ROUTE);
        return;
      }
      setStatus(game.status);
      setPlayers(game.players);
      setLoading(false);
    });
  };

  const startGame = () => {
    socket.emit(SocketEvents.START_GAME, { id: params.id });
  };

  const leaveGame = () => {
    socket.emit(SocketEvents.LEAVE_GAME, { id: params.id });
    history.push(Routes.HOME_ROUTE);
  };

  const addSocketListeners = () => {
    socket.on(SocketEvents.PLAYERS_UPDATE, (game: GameState) => {
      setPlayers(game.players);
    });

    socket.on(SocketEvents.STATUS_UPDATE, (game: GameState) => {
      setStatus(game.status);
    });

    socket.on(SocketEvents.STONKS_UPDATE, (game: GameState) => {
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
    case Game.STATUS_PARTY:
      content = (
        <Lobby socketId={socket.id} code={params.id} players={players} startGame={startGame} leaveGame={leaveGame} />
      );
      break;
    case Game.STATUS_START:
      content = <Session socketId={socket.id} stonks={stonks} players={players} />;
      break;
    case Game.STATUS_END:
    default:
      content = <Error />;
  }

  return content;
};

export default GamePage;
