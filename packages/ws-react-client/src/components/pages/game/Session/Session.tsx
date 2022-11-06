import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { PlayerType, StonkType } from 'ws-core';

import TimeDisplay from '../../../common/TimeDisplay';
import { getPlayerInfo } from '../../../../helpers/utils';

const Layout = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 1rem;
  display: flex;
`;

const Stonks = styled.div`
  flex: 2 1 0;
`;

const Tracker = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
`;

const TrackerHeader = styled.div`
  width: 100%;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const TrackerBody = styled.div`
  width: 100%;
  padding: 0.5rem;
`;

const PlayerCard = styled.div``;

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

  const renderStonks = () => {
    return stonks.map((stonk: StonkType) => (
      <div key={stonk.symbol}>
        <p>
          {stonk.name} ({stonk.symbol})
        </p>
        <p>
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
        </p>
      </div>
    ));
  };

  const renderPlayerInfo = () => {
    const [playerId, playerName] = getPlayerInfo();
    const currentPlayer = players.find((player) => player.id === playerId);

    return (
      <PlayerCard>
        <p>{playerName} (YOU)</p>
        <p>Cash: ${currentPlayer?.funds}</p>
        <p>Net: ${currentPlayer?.netValue}</p>
      </PlayerCard>
    );
  };

  const renderPlayerStonks = () => {
    const [playerId] = getPlayerInfo();
    const currentPlayer = players.find((player) => player.id === playerId);
    if (!currentPlayer) return null;

    return (
      <>
        <p>Positions</p>
        {Object.entries(currentPlayer?.portfolio).map(([key, val]) => (
          <span key={key}>
            {key}: {val}
          </span>
        ))}
      </>
    );
  };

  const renderPlayerStandings = () => {
    const standings = players.sort((player1, player2) => player1.netValue - player2.netValue);
    return (
      <>
        <p>Standings</p>
        {standings.map((player) => (
          <p key={player.id}>{player.name}</p>
        ))}
      </>
    );
  };

  return (
    <Layout>
      <Stonks>{renderStonks()}</Stonks>
      <Tracker>
        <TrackerHeader>
          <TimeDisplay value={timeLeft} />
          <h2>Now Playing: {code}</h2>
        </TrackerHeader>
        <TrackerBody>
          {renderPlayerInfo()}
          {renderPlayerStonks()}
          {renderPlayerStandings()}
        </TrackerBody>
      </Tracker>
    </Layout>
  );
};

export default Session;
