import { PlayerType, StonkType } from 'ws-core';

import { Layout, TimeArea, GameArea, ScoreArea } from './styles';

interface Props {
  /** game identifier  */
  code: string;
  /** array of player details */
  players: PlayerType[];
  /** array of stonks */
  stonks: StonkType[];
  /** moves game to next step (host only) */
  startGame: () => void;
  /** removes current user from lobby */
  leaveGame: () => void;
}

const Session = ({ code }: Props) => {
  return (
    <Layout>
      <TimeArea>
        <h2>TIME</h2>
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
