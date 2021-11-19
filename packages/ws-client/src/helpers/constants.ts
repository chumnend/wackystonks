// page routes
export const Routes = {
  HOME_ROUTE: '/',
  GAME_ROUTE: '/:id',
  WITH_GAME_ROUTE: (id: string) => `/${id}`,
  REGISTER_ROUTE: '/register',
  LOGIN_ROUTE: '/login',
  LOGOUT_ROUTE: '/logout',
};

export const SocketEvents = {
  // socket listeners
  PLAYERS_UPDATE: 'players-update',
  STATUS_UPDATE: 'status-update',
  STONKS_UPDATE: 'stonks-update',
  GAME_ENDED: 'game-ended',

  // socket emitters
  CREATE_GAME: 'create-game',
  FIND_GAME: 'find-game',
  DELETE_GAME: 'delete-game',
  JOIN_GAME: 'join-game',
  LEAVE_GAME: 'leave-game',
  START_GAME: 'start-game',
  RENAME_PLAYER: 'rename-player',
};
