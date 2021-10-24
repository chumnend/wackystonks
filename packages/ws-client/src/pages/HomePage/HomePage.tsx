import * as Styled from './styles';

const HomePage = () => {
  const handleStartSim = () => {
    console.log('starting...');
  };

  const handleJoinSim = () => {
    console.log('joining..');
  };

  return (
    <Styled.HomePage>
      <Styled.Content>
        <Styled.Banner>
          <h1>WackyStonks!</h1>
          <h3>A Stock Simulator Game</h3>
        </Styled.Banner>
        <Styled.MainButtons>
          <button onClick={handleStartSim}>Start Sim</button>
          <button onClick={handleJoinSim}>Join Sim</button>
        </Styled.MainButtons>
        <Styled.ExtraButtons>
          <button>How To Play</button>
        </Styled.ExtraButtons>
      </Styled.Content>
    </Styled.HomePage>
  );
};

export default HomePage;
