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

  useEffect(() => {
    const { id } = params;
    socket.emit(SocketEvents.FIND_GAME, { id }, (game: GameState) => {
      if (game) {
        setGameState(game);
      } else {
        // TODO: Handle faliure to find game better
        history.push(Routes.HOME_ROUTE);
      }
    });

    return () => {
      socket.emit(SocketEvents.DELETE_GAME, { id: params.id });
    };
  }, []);

  let content;
  switch (gameState?.status) {
    case Game.STATUS_PARTY:
      content = <GameLobby gameState={gameState} />;
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
