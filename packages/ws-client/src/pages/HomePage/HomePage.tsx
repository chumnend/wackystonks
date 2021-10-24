import * as Styled from './styles';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const HomePage = () => {
  const handleStartSim = () => {
    console.log('starting...');
  };

  const handleJoinSim = () => {
    console.log('joining..');
  };

  return (
    <Styled.HomePage>
      <Header />
      <Styled.Content>
        <Styled.Banner>
          <h1>WackyStonks</h1>
          <h3>A Stock Simulator Game</h3>
        </Styled.Banner>
        <Styled.MainButtons>
          <Styled.MainButton onClick={handleStartSim}>Start Sim</Styled.MainButton>
          <Styled.MainButton onClick={handleJoinSim}>Join Sim</Styled.MainButton>
        </Styled.MainButtons>
        <Styled.ExtraButtons>
          <Styled.ExtraButton>How To Play</Styled.ExtraButton>
        </Styled.ExtraButtons>
      </Styled.Content>
      <Footer />
    </Styled.HomePage>
  );
};

export default HomePage;
