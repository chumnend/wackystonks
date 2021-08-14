import dotenv from 'dotenv';
dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 4000,
  db: process.env.POSTGRES_URI || 'postgres://root:newPassword@localhost:port/dbname',
};

export default config;
