import { PlayerType, StonkType } from 'ws-core';

import TimeDisplay from '../../../common/TimeDisplay';
import { Layout, TimeArea, GameArea, ScoreArea } from './styles';
import { getPlayerInfo } from '../../../../helpers/utils';
import * as Styled from './styles';

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

const Session = ({ code, timeLeft, players }: Props) => {
  const renderTimeArea = () => {
    return (
      <TimeArea>
        <TimeDisplay value={timeLeft} />
      </TimeArea>
    );
  };

  const renderGameArea = () => {
    return (
      <GameArea>
        <h2>Now Playing: {code}</h2>
      </GameArea>
    );
  };

  const renderScoreArea = () => {
    const [playerId, playerName] = getPlayerInfo();
    const currentPlayer = players.find((player) => player.id === playerId);
    const otherPlayers = players.filter((player) => player.id !== playerId);

    return (
      <ScoreArea>
        <Styled.PlayerCard>
          <p>{playerName} (YOU)</p>
          <p>Net: ${currentPlayer?.netValue}</p>
        </Styled.PlayerCard>
        {otherPlayers.map((player) => (
          <Styled.PlayerCard key={player.id}>
            <p>{player.name}</p>
            <p>Net: ${player?.netValue}</p>
          </Styled.PlayerCard>
        ))}
      </ScoreArea>
    );
  };

  return (
    <Layout>
      {renderTimeArea()}
      {renderGameArea()}
      {renderScoreArea()}
    </Layout>
  );
};

export default Session;
