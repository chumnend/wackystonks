import { LineChart, Line, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
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

const Session = ({ code, timeLeft, players, stonks }: Props) => {
  const renderTimeArea = () => {
    return (
      <TimeArea>
        <TimeDisplay value={timeLeft} />
        <h2>Now Playing: {code}</h2>
      </TimeArea>
    );
  };

  const renderGameArea = () => {
    const charts = stonks.map((stonk) => {
      const values = [...stonk.previousPrices, stonk.price];
      const data = values.map((v, idx) => ({
        pv: v,
      }));

      return (
        <Styled.StonkCard key={stonk.symbol}>
          <Styled.StonkHeader>
            <span>
              {stonk.name} ({stonk.symbol})
            </span>
            <span>
              {stonk.price}
              <input type="number" min={0} max={99} value={0} onChange={() => null} />
              <button>Buy</button>
              <button>Sell</button>
            </span>
          </Styled.StonkHeader>
          <ResponsiveContainer width="99%" height={200} aspect={3}>
            <LineChart data={data}>
              <Line type="monotone" dataKey="pv" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </Styled.StonkCard>
      );
    });

    return <GameArea>{charts}</GameArea>;
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
