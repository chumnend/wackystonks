import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { GameType } from 'ws-core';

import Banner from '../../common/Banner';
import BannerImage from '../../../assets/WackyStonks.png';
import Button from '../../common/Button';
import ButtonGroup from '../../common/ButtonGroup';
import Footer from '../../common/Footer';
import HelpModal from './HelpModal';
import JoinModal from './JoinModal';
import PageWrapper from '../../common/PageWrapper';
import { useSocket } from '../../providers/SocketProvider';

import * as SocketEvents from '../../../helpers/socketEvents';
import * as Routes from '../../../helpers/routes';

const MODAL_NONE = 0;
const MODAL_HELP = 1;
const MODAL_JOIN = 2;

const HomePage = () => {
  const [modal, setModal] = useState(0);
  const history = useHistory();
  const socket = useSocket();

  const startGame = () => {
    socket.emit(SocketEvents.CREATE_GAME, {}, (gameId: string) => {
      history.push(Routes.WITH_GAME_ROUTE(gameId));
    });
  };

  const joinGame = (code: string, name: string) => {
    const uuid = uuidv4();

    localStorage.setItem('playerId', uuid);
    localStorage.setItem('playerName', name);

    socket.emit(
      SocketEvents.FIND_GAME,
      {
        gameId: code,
        playerId: uuid,
        playerName: name,
      },
      (state: GameType) => {
        if (!state) {
          // TODO: Handle this error better
          alert('Game not found');
          return;
        }
        history.push(Routes.WITH_GAME_ROUTE(state.id));
      },
    );
  };

  let currentModal = null;
  switch (modal) {
    case 1:
      currentModal = <HelpModal show={modal === MODAL_HELP} close={() => setModal(MODAL_NONE)} />;
      break;
    case 2:
      currentModal = <JoinModal show={modal === MODAL_JOIN} close={() => setModal(MODAL_NONE)} join={joinGame} />;
      break;
    default:
      currentModal = null;
  }

  return (
    <PageWrapper>
      <Banner src={BannerImage} alt="WackStonks Banner" title="A Stonk Simulator Game" />
      <ButtonGroup direction="row">
        <Button variant="primary" text="Start" onClick={startGame} />
        <Button variant="primary" text="Join" onClick={() => setModal(MODAL_JOIN)} />
      </ButtonGroup>
      <ButtonGroup direction="column">
        <Button variant="secondary" text="How to Play" onClick={() => setModal(MODAL_HELP)} />
      </ButtonGroup>
      {currentModal}
      <Footer />
    </PageWrapper>
  );
};

export default HomePage;
