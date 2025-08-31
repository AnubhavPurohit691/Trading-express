import { time } from "console"
import { Pool } from "pg"

const pool = new Pool({
  connectionString: "postgres://postgres:postgres@localhost:5432/postgres",
})
const IntervalMap: Record<string, string> = {
  "1s": "secound",
  "1m": "minute",
  "3m": "3minute",
  "5m": "5minute"
}

export const dbquery = async (timeinterval: string, asset: string, limit: string) => {

  const Client = await pool.connect()
  const suffix = IntervalMap[timeinterval];
  console.log(suffix)
  const tableName = `kline_${suffix}`
  console.log(tableName)
  try {


    const res = await Client.query(`
    SELECT * FROM klines_${suffix}
    WHERE UPPER(symbol) = UPPER ($1)
    ORDER BY bucket DESC 
    LIMIT $2; 
    `, [asset, Number.parseInt(limit, 10)])

    return res.rows
  }finally{
    Client.release()
  }
  
}
