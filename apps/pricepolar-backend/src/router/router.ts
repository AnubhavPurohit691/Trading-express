
import type { Data } from "../type";
import { connectRedis } from "../connectredis/connectredis";
import {pub} from "../connectredis/connectredis"
  export async function scalewebsocket(data:Data){
    // function getBuyPrice(price: number) {
    //     return price + ( SPREAD_CONSTANT * price);
    //   }
      
    //   function getSellPrice(price: number) {
    //     return price - (SPREAD_CONSTANT * price);
    //   }
    // console.log(data)
    pub.publish("*",JSON.stringify(data))
    // console.log("publish problem")
    
  }