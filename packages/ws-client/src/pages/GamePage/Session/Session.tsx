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

const Session = ({}: Props) => {
  return (
    <Styled.Session>
      <Styled.Header>Header</Styled.Header>
      <Styled.Content>
        <Styled.Stonks>Stonks</Styled.Stonks>
        <Styled.Players>Players</Styled.Players>
      </Styled.Content>
    </Styled.Session>
  );
};

export default Session;
