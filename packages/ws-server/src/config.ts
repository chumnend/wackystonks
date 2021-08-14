import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 4000,
  db: process.env.POSTGRES_URI || 'postgres://root:newPassword@localhost:port/dbname',

  eraseDatabaseOnSync: process.env.ERASE_DATABASE_ON_SYNC === 'true' || false,
  alterDatabaseOnSync: process.env.NODE_ENV === 'development',
};

export const sequelize = new Sequelize(config.db, {
  dialect: 'postgres',
  logging: false,
});

export default config;
