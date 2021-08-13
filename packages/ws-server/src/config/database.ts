import { Pool } from 'pg';

import { POSTGRES_URI } from './constants';

const pool = new Pool({
  max: 20,
  connectionString: POSTGRES_URI,
  idleTimeoutMillis: 30000,
});

export default pool;
