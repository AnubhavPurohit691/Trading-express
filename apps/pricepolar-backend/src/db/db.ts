import { Pool } from "pg";
import "dotenv/config"
export const pool=new Pool({
    connectionString: "postgres://postgres:postgres@localhost:5432/postgres"
})

