import { GameState } from 'ws-assets';

import * as Styled from './styles';

interface Props {
  socketId: string;
  gameState: GameState;
  leaveGame: () => void;
}

const GameLobby = ({ socketId, gameState, leaveGame }: Props) => {
  const handleCopyLink = () => {
    const inviteUrl = process.env.REACT_APP_CLIENT_URI + '/' + gameState.id;
    navigator.clipboard.writeText(inviteUrl);
  };

  const handleStartGame = () => {
    alert('Not Yet Implemented');
  };

  const handleLeaveGame = () => {
    leaveGame();
  };

  const playerList = (
    <Styled.PlayerCards>
      {gameState.players.map((p) => (
        <Styled.PlayerCard key={p.id}>
          {p.name} {socketId === p.id && '(You)'}
        </Styled.PlayerCard>
      ))}
    </Styled.PlayerCards>
  );

  return (
    <Styled.GameLobby>
      <Styled.BannerContainer>
        <h2>Room Code: {gameState.id}</h2>
        <Styled.InviteLink onClick={handleCopyLink}>(Click here to copy link)</Styled.InviteLink>
      </Styled.BannerContainer>
      <Styled.PlayerContainer>
        <h3>Players</h3>
        {playerList}
      </Styled.PlayerContainer>
      <Styled.ChatContainer>
        <h3>Chat</h3>
        <div>
          <p>Not Yet Implemented</p>
        </div>
      </Styled.ChatContainer>
      <Styled.ButtonContainer>
        <Styled.Button disabled onClick={handleStartGame}>
          Start Game
        </Styled.Button>
        <Styled.Button onClick={handleLeaveGame}>Leave Lobby</Styled.Button>
      </Styled.ButtonContainer>
    </Styled.GameLobby>
  );
};

export default GameLobby;
