import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { GameType } from 'ws-core';

import Banner from '../../common/Banner';
import BannerImage from '../../../helpers/assets/WackyStonks.png';
import Button from '../../common/Button';
import ButtonGroup from '../../common/ButtonGroup';
import Footer from '../../common/Footer';
import HelpModal from './HelpModal';
import JoinModal from './JoinModal';
import PageWrapper from '../../common/PageWrapper';
import { useSocket } from '../../providers/SocketProvider';
import { useToast } from '../../providers/ToastProvider';

import { createPlayerInfo, clearPlayerInfo } from '../../../helpers/playerInfo';
import * as SocketEvents from '../../../helpers/socketEvents';
import * as Routes from '../../../helpers/routes';
import StartModal from './StartModal';

const MODAL_NONE = 0;
const MODAL_HELP = 1;
const MODAL_JOIN = 2;
const MODAL_START = 3;

const HomePage = () => {
  const [modal, setModal] = useState(0);
  const history = useHistory();
  const socket = useSocket();
  const { addMessage } = useToast();

  useEffect(() => {
    clearPlayerInfo();
  }, []);

  const startGame = (name: string) => {
    createPlayerInfo(name);
    socket.emit(SocketEvents.CREATE_GAME, {}, (gameId: string) => {
      history.push(Routes.WITH_GAME_ROUTE(gameId));
    });
  };

  const joinGame = (code: string, name: string) => {
    const uuid = createPlayerInfo(name);
    socket.emit(
      SocketEvents.FIND_GAME,
      {
        gameId: code,
        playerId: uuid,
        playerName: name,
      },
      (state: GameType) => {
        if (!state) {
          addMessage(`Game not found: ${code}`);
          return;
        }
        history.push(Routes.WITH_GAME_ROUTE(state.id));
      },
    );
  };

  const openHelpModal = () => {
    setModal(MODAL_HELP);
  };

  const openJoinModal = () => {
    setModal(MODAL_JOIN);
  };

  const openStartModal = () => {
    setModal(MODAL_START);
  };

  const closeModal = () => {
    setModal(MODAL_NONE);
  };

  let currentModal = null;
  switch (modal) {
    case MODAL_HELP:
      currentModal = <HelpModal show={modal === MODAL_HELP} close={closeModal} />;
      break;
    case MODAL_JOIN:
      currentModal = <JoinModal show={modal === MODAL_JOIN} close={closeModal} join={joinGame} />;
      break;
    case MODAL_START:
      currentModal = <StartModal show={modal === MODAL_START} close={closeModal} start={startGame} />;
      break;
    default:
      currentModal = null;
  }

  return (
    <PageWrapper>
      <Banner src={BannerImage} alt="WackStonks Banner" title="A Stonk Simulator Game" />
      <ButtonGroup direction="row">
        <Button variant="primary" text="Create" onClick={openStartModal} />
        <Button variant="primary" text="Join" onClick={openJoinModal} />
      </ButtonGroup>
      <ButtonGroup direction="column">
        <Button variant="secondary" text="How to Play" onClick={openHelpModal} />
      </ButtonGroup>
      {currentModal}
      <Footer />
    </PageWrapper>
  );
};

export default HomePage;
