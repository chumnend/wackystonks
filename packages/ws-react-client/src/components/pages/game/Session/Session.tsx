import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PlayerType, StonkType } from 'ws-core';

import TimeDisplay from '../../../common/TimeDisplay';
import { getPlayerInfo } from '../../../../helpers/utils';

const Layout = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 1rem;
  display: flex;
  gap: 1rem;
`;

const LeftRail = styled.div`
  flex: 2 1 0;
  display: flex;
  flex-direction: column;
`;

const Stonks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StonkCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StonkCardTop = styled.div`
  width: 100%;
  height: 50px;
  padding: 0.5rem 1rem;
  background: #fff;
  border: 1px solid black;
  box-shadow: 0 5px 10px rgb(0, 0, 0, 0.12);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StonkCardBottom = styled.div`
  width: 100%;
  height: 200px;
`;

const RightRail = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`;

const Timer = styled.div`
  width: 100%;
  padding: 1rem 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Info = styled.div`
  flex: 1 1 0;
  width: 100%;
  padding: 0.5rem;
`;

const Holdings = styled.div`
  flex: 1 1 auto;
  width: 100%;
  padding: 0.5rem;
`;

const Standings = styled.div`
  flex: 1 1 auto;
  width: 100%;
  padding: 0.5rem;
`;

const Heading = styled.h2`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const Body = styled.div`
  width: 100%;
  padding: 0.5rem;
`;

const Card = styled.div`
  width: 100%;
  max-height: 5rem;
  border: 1px solid black;
  box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
  padding: 1rem;
`;

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
  const [playerId, playerName] = getPlayerInfo();

  const currentPlayer = players.find((player) => player.id === playerId);
  const standings = players.sort((player1, player2) => player1.netValue - player2.netValue);

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

  const renderLeftRail = () => {
    return (
      <LeftRail>
        <Stonks>
          {stonks.map((stonk: StonkType) => {
            const data = stonk.previousPrices.map((price: number) => ({
              date: new Date().toLocaleTimeString(),
              value: price,
            }));

            return (
              <StonkCard key={stonk.symbol}>
                <StonkCardTop>
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
                </StonkCardTop>
                <StonkCardBottom>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </StonkCardBottom>
              </StonkCard>
            );
          })}
        </Stonks>
      </LeftRail>
    );
  };

  const renderRightRail = () => {
    return (
      <RightRail>
        <Timer>
          <TimeDisplay value={timeLeft} />
          <Heading>Now Playing: {code}</Heading>
        </Timer>
        <Info>
          <Card>
            <p>{playerName} (YOU)</p>
            <p>Cash: ${currentPlayer?.funds}</p>
            <p>Net: ${currentPlayer?.netValue}</p>
          </Card>
        </Info>
        <Holdings>
          <Heading>Portfolio</Heading>
          <Body>
            {currentPlayer && Object.entries(currentPlayer.portfolio).length > 0 ? (
              Object.entries(currentPlayer.portfolio).map(([key, val]) => (
                <Card key={key}>
                  {key} - Qty: {val}
                </Card>
              ))
            ) : (
              <p>You currently own nothing!</p>
            )}
          </Body>
        </Holdings>
        <Standings>
          <Heading>Standings</Heading>
          <Body>
            {standings.map((player, idx) => (
              <Card key={player.id}>
                {idx + 1}: {player.name}
              </Card>
            ))}
          </Body>
        </Standings>
        <Standings></Standings>
      </RightRail>
    );
  };

  return (
    <Layout>
      {renderLeftRail()}
      {renderRightRail()}
    </Layout>
  );
};

export default Session;
