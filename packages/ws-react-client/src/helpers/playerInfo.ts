import { v4 as uuidv4 } from 'uuid';

import { generateName } from './generateName';

export const createPlayerInfo = (name: string): string => {
  const uuid = uuidv4();
  localStorage.setItem('playerId', uuid);
  localStorage.setItem('playerName', name);
  return uuid;
};

export const getPlayerInfo = (): [string, string] => {
  const id = localStorage.getItem('playerId');
  const name = localStorage.getItem('playerName');

  // if no name stored, generate random name
  if (!id || !name) {
    const randomName = generateName();
    createPlayerInfo(randomName);
    return getPlayerInfo();
  }

  return [id, name];
};

export const clearPlayerInfo = () => {
  localStorage.clear();
};
