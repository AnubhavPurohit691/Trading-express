
import type { Data } from "../type";
import { pub } from "../connectredis/connectredis"
import { symbolName } from "typescript";
const SPREAD_CONSTANT = 0.005
// import { pushTradeDataToDb } from "../db";
// function toBigInt(num: number, precision: number): BigInt {
// return BigInt(Math.random(num * 10 ** precision))
// }
export async function scalewebsocket(data: Data) {
  function getBuyPrice(price: number) {
    return price + (SPREAD_CONSTANT * price);
  }

  function getSellPrice(price: number) {
    return price - (SPREAD_CONSTANT * price);
  }

  const sellPrice = getSellPrice(Number(data.p))
  const buyPrice = getBuyPrice(Number(data.p))
  const AvgPrice = (buyPrice + sellPrice) / 2
  const bidandask = {
    sellPrice,
    buyPrice,
    AvgPrice,

  }
  pub.publish("*", JSON.stringify(bidandask))
  // console.log("publish problem")

}
