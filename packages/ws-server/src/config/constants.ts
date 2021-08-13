import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 4000;
export const POSTGRES_URI = process.env.POSTGRES_URI || 'postgres://root:newPassword@localhost:port/dbname';
