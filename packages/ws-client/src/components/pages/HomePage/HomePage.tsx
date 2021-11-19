import { useState } from 'react';
import { useHistory } from 'react-router';
import { GameState } from 'ws-assets';

import * as Styled from './styles';
import BannerImage from './WackyStonks.png';
import Footer from '../../common/Footer';
import JoinModal from './JoinModal';
import HelpModal from './HelpModal';
import { useSocket } from '../../providers/SocketProvider';
import { SocketEvents, Routes } from '../../../helpers/constants';

const MODAL_NONE = 0;
const MODAL_HELP = 1;
const MODAL_JOIN = 2;

const HomePage = () => {
  const [modal, setModal] = useState(0);
  const history = useHistory();
  const socket = useSocket();

  const startGame = () => {
    socket.emit(SocketEvents.CREATE_GAME, {}, (id: string) => {
      history.push(Routes.WITH_GAME_ROUTE(id));
    });
  };

  const joinGame = (code: string) => {
    socket.emit(SocketEvents.FIND_GAME, { id: code }, (game: GameState) => {
      if (!game) {
        // TODO: Handle this error better
        alert('Game not found');
        return;
      }

      history.push(Routes.WITH_GAME_ROUTE(game.id));
    });
  };

  let currentModal = null;
  switch (modal) {
    case 1:
      currentModal = <HelpModal show={modal == MODAL_HELP} close={() => setModal(MODAL_NONE)} />;
      break;
    case 2:
      currentModal = <JoinModal show={modal == MODAL_JOIN} close={() => setModal(MODAL_NONE)} join={joinGame} />;
      break;
    default:
      currentModal = null;
  }

  return (
    <Styled.HomePage>
      <Styled.Content>
        <Styled.Banner>
          <img src={BannerImage} alt="Wacky Stonks banner" />
          <h3>A Stock Simulator Game</h3>
        </Styled.Banner>
        <Styled.MainButtons>
          <Styled.MainButton onClick={startGame}>Start</Styled.MainButton>
          <Styled.MainButton onClick={() => setModal(MODAL_JOIN)}>Join</Styled.MainButton>
        </Styled.MainButtons>
        <Styled.ExtraButtons>
          <Styled.ExtraButton onClick={() => setModal(MODAL_HELP)}>How To Play</Styled.ExtraButton>
        </Styled.ExtraButtons>
      </Styled.Content>
      {currentModal}
      <Footer />
    </Styled.HomePage>
  );
};

export default HomePage;
