import styled from 'styled-components';
import { PlayerType } from 'ws-core';

import ButtonGroup from '../../../common/ButtonGroup';
import Button from '../../../common/Button';
import CardContainer from '../../../common/CardContainer';
import Flex from '../../../common/Flex';
import PageWrapper from '../../../common/PageWrapper';
import Footer from '../../../common/Footer';

const InviteLink = styled.span`
  &:hover {
    cursor: pointer;
  }
`;

const PlayerCardGrid = styled.div`
  width: 100%;
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.35rem;
  justify-content: center;
  align-items: center;
`;

const PlayerCard = styled.div`
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border-radius: 5px;
  border: 1px solid #eaeaea;
  box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
  padding: 1rem;
`;

interface Props {
  /** clients socket identifier */
  socketId: string;
  /** game identifier  */
  code: string;
  /** array of player details */
  players: PlayerType[];
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
    <PlayerCardGrid>
      {players.map((p) => (
        <PlayerCard key={p.id}>
          {p.name} {socketId === p.id && '(You)'}
        </PlayerCard>
      ))}
    </PlayerCardGrid>
  );

  return (
    <PageWrapper>
      <Flex direction="column" alignItems="center">
        <h2>Room Code: {code}</h2>
        <InviteLink onClick={handleCopyLink}>(Click here to copy link)</InviteLink>
      </Flex>
      <CardContainer>
        <h3>Players</h3>
        {playerList}
      </CardContainer>
      <CardContainer>
        <h3>Chat</h3>
        <div>
          <p>Not Yet Implemented</p>
        </div>
      </CardContainer>
      <ButtonGroup direction="column">
        <Button variant="primary" disabled={!isHost} onClick={handleStartGame} text="Start Game" />
        <Button variant="primary" onClick={handleLeaveGame} text="Leave Lobby" />
      </ButtonGroup>
      <Footer />
    </PageWrapper>
  );
};

export default Lobby;
