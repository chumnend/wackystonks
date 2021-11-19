import { PlayerInfo, StonkInfo } from 'ws-assets';

import * as Styled from './styles';

interface Props {
  /** clients socket identifier */
  socketId: string;
  /** array of stonk details */
  stonks: StonkInfo[];
  /** array of player details */
  players: PlayerInfo[];
}

const Session = ({ stonks, players }: Props) => {
  const stonkCards = stonks.map((stonk) => {
    return (
      <div key={stonk.symbol}>
        <h3>
          {stonk.name} - {stonk.price}
        </h3>
        <div>
          <input type="number" placeholder="Quantity" min={0} />
          <button>Buy</button>
          <button>Sell</button>
        </div>
      </div>
    );
  });

  const playerCards = players.map((player) => {
    return (
      <Styled.PlayerCard key={player.id}>
        <h3>{player.name}</h3>
        <div>${player.netValue}</div>
      </Styled.PlayerCard>
    );
  });

  return (
    <Styled.Session>
      <Styled.Header>{/** TODO: Add Timer */}</Styled.Header>
      <Styled.Content>
        <Styled.Stonks>{stonkCards}</Styled.Stonks>
        <Styled.Players>{playerCards}</Styled.Players>
      </Styled.Content>
    </Styled.Session>
  );
};

export default Session;
