import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';
import { PlayerInfo, StonkInfo } from 'ws-assets';

const PageLayout = styled.div`
  width: 100vw;
  height: auto;
  min-height: 100vh;
  position: relative;
  display: flex;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 2fr 1fr;
`;

const StonkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
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
  padding: 1rem;
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
}

const Session = ({ stonks, players }: Props) => {
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
            <input type="text" />
            <button>Buy</button>
            <button>Sell</button>
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
      <StonkContainer>
        <StonkCardContainer>{stonkList}</StonkCardContainer>
      </StonkContainer>
      <PlayerContainer>
        <PlayerCardContainer>{playerList}</PlayerCardContainer>
      </PlayerContainer>
    </PageLayout>
  );
};

export default Session;
