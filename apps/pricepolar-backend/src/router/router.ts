
import type { Data } from "../type";
import { connectRedis } from "../connectredis/connectredis";
import {pub} from "../connectredis/connectredis"
  export async function scalewebsocket(data:Data){
   await connectRedis()
    // function getBuyPrice(price: number) {
    //     return price + ( SPREAD_CONSTANT * price);
    //   }
      
    //   function getSellPrice(price: number) {
    //     return price - (SPREAD_CONSTANT * price);
    //   }
    pub.publish(data.e,JSON.stringify(data))
    
  }