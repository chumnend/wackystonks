import { PlayerType } from 'ws-core';

import PageWrapper from '../../../common/PageWrapper';

interface Props {
  /** array of player details */
  players: PlayerType[];
}

const EndScreen = ({ players }: Props) => {
  const getWinner = (): PlayerType => {
    let highestNetValue = -Infinity;
    let winningPlayerId = '';

    players.forEach((player: PlayerType) => {
      const netValue = player.netValue;
      if (netValue > highestNetValue) {
        highestNetValue = netValue;
        winningPlayerId = player.id;
      }
    });

    const player = players.find((player) => player.id === winningPlayerId) as PlayerType;
    return player;
  };

  return (
    <PageWrapper>
      <h2>Game Over</h2>
      <p>Winner: {getWinner().name}</p>
      <p>Score: {getWinner().netValue}</p>
    </PageWrapper>
  );
};

export default EndScreen;
