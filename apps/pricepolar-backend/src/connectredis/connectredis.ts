import { createClient, type RedisClientType } from "redis"
 export const pub: RedisClientType = createClient({
    url: process.env.redis_Url || "",
  })
  export const sub: RedisClientType = pub.duplicate()

export async function connectRedis(){
    


      await pub.connect();
      await sub.connect()
}
