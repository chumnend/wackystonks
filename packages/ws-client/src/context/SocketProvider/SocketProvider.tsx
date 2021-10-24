import { createContext, useContext } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL: string = process.env.REACT_APP_SOCKET_URI || '';

export const socket = io(SOCKET_URL);

const SocketContext = createContext<Socket>(socket);

export const useSocket = () => useContext(SocketContext);

interface Props {
  children: React.ReactNode;
}

const SocketProvider = ({ children }: Props) => {
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
