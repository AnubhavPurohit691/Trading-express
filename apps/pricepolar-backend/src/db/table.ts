import type { Data } from "../type";
import { pool } from "./db";

export const pushTradeDataToDb = async (wsData: any) => {
  const data = wsData.data;
  const client = await pool.connect();
  try {
    await client.query(
      `
      INSERT INTO trades (
         event_type, event_time, symbol, trade_id,
         price, quantity, trade_time, is_maker
       )
       VALUES (
         $1, to_timestamp($2 / 1000.0), $3, $4,
         $5, $6, to_timestamp($7 / 1000.0), $8
       )
       ON CONFLICT (symbol, trade_id, event_time) DO NOTHING;
       `,
      [
        // Support both trade and aggTrade events
        data.e,
        data.E,
        data.s,
        (data.e === 'aggTrade' ? data.a : data.t), // trade_id
        Number(data.p), // price
        Number(data.q), // quantity
        data.T, // trade_time
        data.m, // is buyer market maker
      ],
    );

    // console.log(
    //   "Trade data inserted/ignored for symbol:",
    //   data.s,
    //   "trade ID:",
    //   (data.e === 'aggTrade' ? data.a : data.t),
    // );
  } finally {
    client.release();
  }
};