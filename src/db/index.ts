import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

let pool: Pool | null = null;
let db = null;

if (databaseUrl) {
  pool = new Pool({
    connectionString: databaseUrl,
  });

  db = drizzle(pool);
}

export { pool, db };