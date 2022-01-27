import { v4 as uuidv4 } from 'uuid';

export const createPlayerInfo = (name: string): string => {
  const uuid = uuidv4();
  localStorage.setItem('playerId', uuid);
  localStorage.setItem('playerName', name);
  return uuid;
};

export const getPlayerInfo = (): [string | null, string | null] => {
  const id = localStorage.getItem('playerId');
  const name = localStorage.getItem('playerName');
  return [id, name];
};

export const clearPlayerInfo = () => {
  localStorage.clear();
};
