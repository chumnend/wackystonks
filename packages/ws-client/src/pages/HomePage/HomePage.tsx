import NavBar from '../../components/NavBar';

const HomePage = () => {
  const handleStartSim = () => {
    console.log('starting...');
  };

  const handleJoinSim = () => {
    console.log('joining..');
  };

  return (
    <div>
      <NavBar />
      <h1>WackyStonks!</h1>
      <h3>A Stock Simulator Game</h3>
      <div>
        <button onClick={handleStartSim}>Start Sim</button>
        <button onClick={handleJoinSim}>Join Sim</button>
        <button>How To Play</button>
      </div>
      <div>
        <h4>
          By <b>Nicholas Chumney</b>
        </h4>
        <a href="#">View on GitHub</a>
      </div>
    </div>
  );
};

export default HomePage;
