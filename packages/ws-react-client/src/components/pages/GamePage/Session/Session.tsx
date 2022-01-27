import { PlayerType, StonkType } from 'ws-core';

import PageWrapper from '../../../common/PageWrapper';

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
    <PageWrapper>
      <h2>Now Playing: {code}</h2>
    </PageWrapper>
  );
};

export default Session;
