import { useState } from 'react';
import { useHistory } from 'react-router';

import * as Styled from './styles';
import BannerImage from './WackyStonks.png';
import Footer from '../../components/Footer';
import Modal from '../../components/Modal';

const HomePage = () => {
  const [showInstructions, setInstructions] = useState(false);
  const history = useHistory();

  const handleStart = () => {
    history.push('/1234');
  };

  const handleJoin = () => {
    history.push('/1234');
  };

  return (
    <Styled.HomePage>
      <Styled.Content>
        <Styled.Banner>
          <img src={BannerImage} alt="Wacky Stonks banner" />
          <h3>A Stock Simulator Game</h3>
        </Styled.Banner>
        <Styled.MainButtons>
          <Styled.MainButton onClick={handleStart}>Start</Styled.MainButton>
          <Styled.MainButton onClick={handleJoin}>Join</Styled.MainButton>
        </Styled.MainButtons>
        <Styled.ExtraButtons>
          <Styled.ExtraButton onClick={() => setInstructions(true)}>How To Play</Styled.ExtraButton>
        </Styled.ExtraButtons>
      </Styled.Content>
      <Modal show={showInstructions} close={() => setInstructions(false)}>
        <Styled.InstructionsHeader>
          <h2>Instructions</h2>
        </Styled.InstructionsHeader>
        <Styled.InstructionsList>
          <li>TODO</li>
        </Styled.InstructionsList>
      </Modal>
      <Footer />
    </Styled.HomePage>
  );
};

export default HomePage;
