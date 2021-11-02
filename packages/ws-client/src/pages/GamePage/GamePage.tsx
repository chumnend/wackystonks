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

  const findGame = (game: GameState) => {
    if (game) {
      setGameState(game);
    } else {
      // TODO: Handle faliure to find game better
      history.push(Routes.HOME_ROUTE);
    }
  };

  const leaveGame = () => {
    socket.emit(SocketEvents.LEAVE_GAME, { id: params.id }, () => {
      history.push(Routes.HOME_ROUTE);
    });
  };

  useEffect(() => {
    socket.emit(SocketEvents.FIND_GAME, { id: params.id }, (game: GameState) => {
      findGame(game);
    });

    return () => {
      leaveGame();
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
