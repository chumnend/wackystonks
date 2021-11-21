import { PlayerInfo, StonkInfo } from 'ws-assets';

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
    <div>
      <span>Session</span>
    </div>
  );
};

export default Session;
