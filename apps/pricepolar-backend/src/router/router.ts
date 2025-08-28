
import type { Data } from "../type";
import {pub} from "../connectredis/connectredis"
const SPREAD_CONSTANT=0.005
// import { pushTradeDataToDb } from "../db";
  export async function scalewebsocket(data:Data){
    function getBuyPrice(price: number) {
        return price + ( SPREAD_CONSTANT * price);
      }
      
      function getSellPrice(price: number) {
        return price - (SPREAD_CONSTANT * price);
      }

      const sellPrice= getSellPrice(Number(data.p))
      console.log(sellPrice)
      const buyPrice = getBuyPrice(Number(data.p))
      console.log(buyPrice)
      const Avgprice=(buyPrice+sellPrice)/2
      console.log(Avgprice)
    // console.log(data)
    // console.log(data)
    // console.log("working")
    const bidandask={
      sellPrice,
      buyPrice,
      Avgprice
    }
    pub.publish("*",JSON.stringify(bidandask))
    // console.log("publish problem")
    
  }