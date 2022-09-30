import { PlayerType } from 'ws-core';

import ButtonGroup from '../../../common/ButtonGroup';
import Button from '../../../common/Button';
import PageWrapper from '../../../common/PageWrapper';

interface Props {
  /** array of player details */
  players: PlayerType[];
  /** removes current user from lobby */
  leaveGame: () => void;
}

const EndScreen = ({ players, leaveGame }: Props) => {
  const getStandings = (): PlayerType[] => {
    const standings = [...players];
    standings.sort((a, b) => b.netValue - a.netValue);
    return standings;
  };

  const getWinner = (): PlayerType => {
    return getStandings()[0];
  };

  return (
    <PageWrapper>
      <h2>Game Over</h2>
      <p>Winner: {getWinner().name}</p>
      <p>Score: {getWinner().netValue}</p>

      <ButtonGroup direction="row">
        <Button variant="primary" onClick={leaveGame} text="Leave" />
      </ButtonGroup>
    </PageWrapper>
  );
};

export default EndScreen;
