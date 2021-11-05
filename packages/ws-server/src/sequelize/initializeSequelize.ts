import { createUsers } from './seeds/users';
import config, { sequelize } from '../config';

const initializeSequelize = async (): Promise<void> => {
  await sequelize.sync({
    force: config.eraseDatabaseOnSync,
    alter: config.alterDatabaseOnSync,
  });

  if (config.eraseDatabaseOnSync) {
    await createUsers();
  }
};

export default initializeSequelize;
