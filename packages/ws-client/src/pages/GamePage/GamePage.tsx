import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Game, GameState, PlayerInfo } from 'ws-assets';

import * as Styled from './styles';
import Lobby from './Lobby';
import GameStart from './GameStart';
import Footer from '../../components/Footer';
import { Routes, SocketEvents } from '../../constants';
import { useSocket } from '../../context/SocketProvider';

interface ParamTypes {
  id: string;
}

const GamePage = () => {
  const [status, setStatus] = useState<string>('');
  const [players, setPlayers] = useState<PlayerInfo[]>([]);
  const history = useHistory();
  const params = useParams<ParamTypes>();
  const socket = useSocket();

  const joinGame = () => {
    socket.emit(SocketEvents.JOIN_GAME, { id: params.id }, (game: GameState) => {
      if (!game) {
        // TODO: Handle faliure to find game better
        history.push(Routes.HOME_ROUTE);
        return;
      }
      setStatus(game.status);
      setPlayers(game.players);
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
  };

  const removeSocketListeners = () => {
    socket.off(SocketEvents.PLAYERS_UPDATE);
  };

  useEffect(() => {
    joinGame();
    addSocketListeners();

    return () => {
      leaveGame();
      removeSocketListeners();
    };
  }, []);

  let content;
  switch (status) {
    case Game.STATUS_PARTY:
      content = (
        <Lobby socketId={socket.id} code={params.id} players={players} startGame={startGame} leaveGame={leaveGame} />
      );
      break;
    case Game.STATUS_START:
      content = <GameStart />;
      break;
    case Game.STATUS_END:
    default:
      content = <p>Something went wrong</p>;
  }

  return (
    <Styled.GamePage>
      <Styled.Content>{content}</Styled.Content>
      <Footer />
    </Styled.GamePage>
  );
};

export default GamePage;
