import { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';
import { PlayerInfo, StonkInfo } from 'ws-assets';

const PageLayout = styled.div`
  width: 100vw;
  height: auto;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Flex = styled.div`
  flex: 1 1 36px;
  display: flex;
  padding: 1rem 1rem 0 1rem;
`;

const Header = styled.div`
  width: 100%;
  flex: 1 1 auto;
  border-radius: 5px;
  border: 1px solid #eaeaea;
  background: #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Grid = styled.div`
  flex: 1 1 auto;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 2fr 1fr;
`;

const StonkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem 1rem 1rem;
`;

const StonkCardContainer = styled.div`
  width: 100%;
  height: 80vh;
  border-radius: 5px;
  border: 1px solid #eaeaea;
  background: #eaeaea;
  box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
  padding: 1rem;
  overflow: scroll;
`;

const StonkCard = styled.div`
  width: 100%;
  height: 270px;
  background: #fff;
  margin: 1rem 0;
  border-radius: 10px;
  padding: 10px 1.5rem;
`;

const StonkCardHeader = styled.div`
  heighr: 50px;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PlayerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem 1rem 1rem;
`;

const PlayerCardContainer = styled.div`
  width: 100%;
  height: 80vh;
  border-radius: 5px;
  border: 1px solid #eaeaea;
  background: #eaeaea;
  box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
  padding: 1rem;
  overflow: scroll;
`;

const PlayerCard = styled.div`
  width: 100%;
  height: auto;
  background: #fff;
  margin: 1rem 0;
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

interface Props {
  /** clients socket identifier */
  socketId: string;
  /** array of stonk details */
  stonks: StonkInfo[];
  /** array of player details */
  players: PlayerInfo[];
  /** buy a stonk */
  buyStonk: (symbol: string, amount: number) => void;
  /** sell a stonk */
  sellStonk: (symbol: string, amount: number) => void;
}

interface Quantity {
  [key: string]: number;
}

const Session = ({ stonks, players, buyStonk, sellStonk }: Props) => {
  const [quantity, setQuantity] = useState<Quantity>({});

  useEffect(() => {
    const initialQuantity: Quantity = {};
    for (const stonk of stonks) {
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

  const stonkList = stonks.map((stonk) => {
    const data = stonk.previousPrices.map((price) => ({
      time: new Date(Date.now()).toUTCString(),
      pv: price,
    }));

    return (
      <StonkCard key={stonk.symbol}>
        <StonkCardHeader>
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
        </StonkCardHeader>
        <ResponsiveContainer height={200}>
          <LineChart data={data}>
            <Line type="monotone" dataKey="pv" stroke="#8884d8" />
            <XAxis dataKey="time" />
            <YAxis />
          </LineChart>
        </ResponsiveContainer>
      </StonkCard>
    );
  });

  const playerList = players.map((player) => (
    <PlayerCard key={player.id}>
      <span>{player.name}</span>
      <span>${player.netValue}</span>
    </PlayerCard>
  ));

  return (
    <PageLayout>
      <Flex>
        <Header>
          <HeaderContainer>
            <div />
            <span>##:##</span>
            <button>Leave</button>
          </HeaderContainer>
        </Header>
      </Flex>
      <Grid>
        <StonkContainer>
          <StonkCardContainer>{stonkList}</StonkCardContainer>
        </StonkContainer>
        <PlayerContainer>
          <PlayerCardContainer>{playerList}</PlayerCardContainer>
        </PlayerContainer>
      </Grid>
    </PageLayout>
  );
};

export default Session;
