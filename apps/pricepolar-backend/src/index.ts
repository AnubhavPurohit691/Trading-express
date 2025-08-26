import WebSocket from 'ws';
import type {Data} from "./type/index"
import { scalewebsocket } from './router/router';
const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");

const SPREAD_CONSTANT = 0.005;



ws.on("open", () => {
  console.log("Binance WebSocket");
});

ws.on("message", (msg) => {
  const data:Data = JSON.parse(msg.toString());
  scalewebsocket(data)
});


