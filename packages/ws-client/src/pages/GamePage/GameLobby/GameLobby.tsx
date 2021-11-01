import { GameState } from 'ws-assets';

import * as Styled from './styles';

interface Props {
  gameState: GameState;
}

const GameLobby = ({ gameState }: Props) => {
  const handleCopyLink = () => {
    const inviteUrl = process.env.REACT_APP_CLIENT_URI + '/' + gameState.id;
    navigator.clipboard.writeText(inviteUrl);
  };

  const handleStartGame = () => {
    alert('starting...');
  };

  const handleLeaveGame = () => {
    alert('leaving...');
  };

  return (
    <Styled.GameLobby>
      <Styled.BannerContainer>
        <h2>Room Code: {gameState.id}</h2>
        <Styled.InviteLink onClick={handleCopyLink}>(Click here to copy link)</Styled.InviteLink>
      </Styled.BannerContainer>
      <Styled.PlayerContainer>
        <h3>Players</h3>
        <div></div>
      </Styled.PlayerContainer>
      <Styled.ChatContainer>
        <h3>Chat</h3>
        <div></div>
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
