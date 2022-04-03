import { PlayerType, StonkType } from 'ws-core';

import TimeDisplay from '../../../common/TimeDisplay';
import { Layout, TimeArea, GameArea, ScoreArea } from './styles';

interface Props {
  /** game identifier  */
  code: string;
  /** array of player details */
  players: PlayerType[];
  /** array of stonks */
  stonks: StonkType[];
  /** Time left on game timer */
  timeLeft: number;
  /** moves game to next step (host only) */
  startGame: () => void;
  /** removes current user from lobby */
  leaveGame: () => void;
}

const Session = ({ code, timeLeft }: Props) => {
  return (
    <Layout>
      <TimeArea>
        <TimeDisplay value={timeLeft} />
      </TimeArea>
      <GameArea>
        <h2>Now Playing: {code}</h2>
      </GameArea>
      <ScoreArea>
        <h2>SCORE</h2>
      </ScoreArea>
    </Layout>
  );
};

export default Session;
