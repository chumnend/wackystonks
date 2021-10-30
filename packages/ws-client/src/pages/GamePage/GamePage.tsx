import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SocketEvents } from '../../constants';

import { useSocket } from '../../context/SocketProvider';

interface ParamTypes {
  id: string;
}

const GamePage = () => {
  const params = useParams<ParamTypes>();
  const socket = useSocket();

  useEffect(() => {
    const { id } = params;
    socket.emit(SocketEvents.FIND_GAME, { id }, () => {
      console.log('Hello World');
    });

    return () => {
      socket.emit(SocketEvents.DELETE_GAME, { id: params.id });
    };
  }, []);

  return (
    <div>
      <h1>Game Page</h1>
    </div>
  );
};

export default GamePage;
