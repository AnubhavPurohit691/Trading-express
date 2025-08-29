import { createClient, type RedisClientType } from "redis"
import { WebSocketServer } from "ws"
export const pub: RedisClientType = createClient({
  url: process.env.redis_Url || "redis://localhost:6379",
})
const sub: RedisClientType = pub.duplicate()
const wss = new WebSocketServer({ port: 3004 });

export async function connectredis() {
  await sub.connect()
  sub.pSubscribe("*", (data) => {
    // console.log("data from redis",data)
  })
}

connectredis()
