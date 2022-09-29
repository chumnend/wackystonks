import { useState, useEffect, useRef } from 'react';
import { LineChart, Line, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { PlayerType, StonkType } from 'ws-core';

import TimeDisplay from '../../../common/TimeDisplay';
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
  /** buy a stonk */
  buyStonk: (symbol: string, amount: number) => void;
  /** sell a stonk */
  sellStonk: (symbol: string, amount: number) => void;
}

interface Quantity {
  [key: string]: number;
}

const Session = ({ code, timeLeft, players, stonks, buyStonk, sellStonk }: Props) => {
  const [quantity, setQuantity] = useState<Quantity>({});
  const stonksRef = useRef(stonks);

  useEffect(() => {
    const initialQuantity: Quantity = {};
    for (const stonk of stonksRef.current) {
      initialQuantity[stonk.symbol] = 0;
    }
    setQuantity(initialQuantity);
  }, []);

  const handleBuy = (symbol: string) => {
    buyStonk(symbol, quantity[symbol]);
    const updatedQuantity = { ...quantity, [symbol]: 0 };
    setQuantity(updatedQuantity);
  };

  const handleSell = (symbol: string) => {
    sellStonk(symbol, quantity[symbol]);
    const updatedQuantity = { ...quantity, [symbol]: 0 };
    setQuantity(updatedQuantity);
  };

  const renderTimeArea = () => {
    return (
      <Styled.TimeArea>
        <TimeDisplay value={timeLeft} />
        <h2>Now Playing: {code}</h2>
      </Styled.TimeArea>
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
              <input
                type="number"
                min={0}
                max={99}
                value={quantity[stonk.symbol]}
                onChange={(e) => {
                  const updatedQuantity = { ...quantity, [stonk.symbol]: Number(e.target.value) };
                  setQuantity(updatedQuantity);
                }}
              />
              <button onClick={() => handleBuy(stonk.symbol)}>Buy</button>
              <button onClick={() => handleSell(stonk.symbol)}>Sell</button>
            </span>
          </Styled.StonkHeader>
          <ResponsiveContainer height={250}>
            <LineChart data={data}>
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Styled.StonkCard>
      );
    });

    return <Styled.GameArea>{charts}</Styled.GameArea>;
  };

  const renderScoreArea = () => {
    const [playerId, playerName] = getPlayerInfo();
    const currentPlayer = players.find((player) => player.id === playerId);
    const otherPlayers = players.filter((player) => player.id !== playerId);

    return (
      <Styled.ScoreArea>
        <Styled.PlayerCard>
          <p>{playerName} (YOU)</p>
          <p>Cash: ${currentPlayer?.funds}</p>
          <p>Net: ${currentPlayer?.netValue}</p>
        </Styled.PlayerCard>
        {otherPlayers.map((player) => (
          <Styled.PlayerCard key={player.id}>
            <p>{player.name}</p>
            <p>Net: ${player?.netValue}</p>
          </Styled.PlayerCard>
        ))}
      </Styled.ScoreArea>
    );
  };

  return (
    <Styled.Layout>
      {renderTimeArea()}
      {renderGameArea()}
      {renderScoreArea()}
    </Styled.Layout>
  );
};

export default Session;
