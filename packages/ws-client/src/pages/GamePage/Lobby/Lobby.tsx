import { PlayerInfo } from 'ws-assets';

import * as Styled from './styles';

interface Props {
  /** clients socket identifier */
  socketId: string;
  /** game identifier  */
  code: string;
  /** array of player details */
  players: PlayerInfo[];
  /** moves game to next step (host only) */
  startGame: () => void;
  /** removes current user from lobby */
  leaveGame: () => void;
}

const Lobby = ({ socketId, code, players, startGame, leaveGame }: Props) => {
  const handleCopyLink = () => {
    const inviteUrl = process.env.REACT_APP_CLIENT_URI + '/' + code;
    navigator.clipboard.writeText(inviteUrl);
  };

  const handleStartGame = () => {
    startGame();
  };

  const handleLeaveGame = () => {
    leaveGame();
  };

  const isHost = () => {
    return socketId === players[0].id;
  };

  const playerList = (
    <Styled.PlayerCards>
      {players.map((p) => (
        <Styled.PlayerCard key={p.id}>
          {p.name} {socketId === p.id && '(You)'}
        </Styled.PlayerCard>
      ))}
    </Styled.PlayerCards>
  );

  return (
    <Styled.Lobby>
      <Styled.Content>
        <Styled.BannerContainer>
          <h2>Room Code: {code}</h2>
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
          <Styled.Button disabled={!isHost} onClick={handleStartGame}>
            Start Game
          </Styled.Button>
          <Styled.Button onClick={handleLeaveGame}>Leave Lobby</Styled.Button>
        </Styled.ButtonContainer>
      </Styled.Content>
    </Styled.Lobby>
  );
};

export default Lobby;
