import { v4 as uuidv4 } from 'uuid';

import { generateName } from './generateName';

/**
 * Generates player information and stores it within the client
 * @param name {string} the name of the player
 * @returns {string} the generated id for the player
 */
export const createPlayerInfo = (name: string): string => {
  const uuid = uuidv4();
  localStorage.setItem('playerId', uuid);
  localStorage.setItem('playerName', name);
  return uuid;
};

/**
 * Retireves player information stored in the client
 * @returns {string[]} a tuple containing player data, [id, name]
 */
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

/**
 * Removes stored player data in the client
 */
export const clearPlayerInfo = () => {
  localStorage.clear();
};
