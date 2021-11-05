import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Game, GameState, PlayerInfo } from 'ws-assets';

import * as Styled from './styles';
import GameLobby from './GameLobby';
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

  const leaveGame = () => {
    socket.emit(SocketEvents.LEAVE_GAME, { id: params.id });
    history.push(Routes.HOME_ROUTE);
  };

  const addSocketListeners = () => {
    socket.on(SocketEvents.PLAYERS_UPDATE, (game: GameState) => {
      setPlayers(game.players);
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
      content = <GameLobby socketId={socket.id} code={params.id} players={players} leaveGame={leaveGame} />;
      break;
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
