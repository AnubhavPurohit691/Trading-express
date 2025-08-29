import WebSocket from 'ws';
import type {Data} from "./type/index"
import { scalewebsocket } from './router/router';
import { connectRedis } from './connectredis/connectredis';
// import { insertTrade } from './db';
import { pushTradeDataToDb } from './db/table';
// import { insertTrade } from './db/table';
// import { seedDatabase } from './db/seed';

const baseWebSokcetURI = "wss://stream.binance.com:9443";

const ws = new WebSocket(
	`${baseWebSokcetURI}/stream?streams=btcusdt@trade/ethusdt@trade`,
);

// testPool()

connectRedis()
// seedDatabase()
console.log("finding")
ws.on("open", () => {
  console.log("Binance WebSocket");
});
ws.on("message", (msg) => {
  const data = JSON.parse(msg.toString());
  // console.log(data.e,"data from e")
// console.log(data.data)
  pushTradeDataToDb(data)
  // console.log()
  scalewebsocket(data.data);
});


