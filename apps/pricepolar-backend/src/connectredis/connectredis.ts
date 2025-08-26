import { createClient, type RedisClientType } from "redis"
 export const pub: RedisClientType = createClient({
    url: "redis://localhost:6379"
  })
//   export const sub: RedisClientType = pub.duplicate()

export async function connectRedis(){
      await pub.connect();
    //   await new Promise(r => {
    //     pub.on("connect", () => r())
    //   })
    //   await sub.connect()
}
