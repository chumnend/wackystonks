import { io } from 'socket.io-client';

const uri: string = process.env.REACT_APP_SOCKET_URI || '';

export const socket = io(uri);
