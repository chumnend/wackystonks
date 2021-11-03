import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Game, GameState } from 'ws-assets';

import * as Styled from './styles';
import GameLobby from './GameLobby';
import Footer from '../../components/Footer';
import { Routes, SocketEvents } from '../../constants';
import { useSocket } from '../../context/SocketProvider';

interface ParamTypes {
  id: string;
}

const GamePage = () => {
  const [gameState, setGameState] = useState<GameState>();
  const history = useHistory();
  const params = useParams<ParamTypes>();
  const socket = useSocket();

  const joinGame = () => {
    socket.emit(SocketEvents.JOIN_GAME, { id: params.id }, (game: GameState) => {
      if (!game) {
        // TODO: Handle faliure to find game better
        console.log('unable to find game');
        history.push(Routes.HOME_ROUTE);
        return;
      }

      setGameState(game);
    });
  };

  const leaveGame = () => {
    socket.emit(SocketEvents.LEAVE_GAME, { id: params.id });
    history.push(Routes.HOME_ROUTE);
  };

  const addSocketListeners = () => {
    socket.on(SocketEvents.PLAYERS_UPDATE, (game: GameState) => {
      setGameState(game);
    });
  };

  const removeSocketListeners = () => {
    socket.off(SocketEvents.PLAYERS_UPDATE);
  };

  useEffect(() => {
    addSocketListeners();
    joinGame();

    return () => {
      leaveGame();
      removeSocketListeners();
    };
  }, []);

  let content;
  switch (gameState?.status) {
    case Game.STATUS_PARTY:
      content = <GameLobby socketId={socket.id} gameState={gameState} leaveGame={leaveGame} />;
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
