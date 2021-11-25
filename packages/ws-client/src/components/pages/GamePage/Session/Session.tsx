import { PlayerInfo, StonkInfo } from 'ws-assets';

import PageWrapper from '../../../common/PageWrapper';
import Footer from '../../../common/Footer';

interface Props {
  /** clients socket identifier */
  socketId: string;
  /** array of stonk details */
  stonks: StonkInfo[];
  /** array of player details */
  players: PlayerInfo[];
}

const Session = ({ stonks, players }: Props) => {
  const stonkList = stonks.map((stonk) => (
    <p key={stonk.symbol}>
      {stonk.name} - {stonk.price}
    </p>
  ));

  const playerList = players.map((player) => (
    <p key={player.id}>
      {player.name} - {player.netValue}
    </p>
  ));

  return (
    <PageWrapper fullWidth>
      <div>{stonkList}</div>
      <div>{playerList}</div>
      <Footer />
    </PageWrapper>
  );
};

export default Session;
