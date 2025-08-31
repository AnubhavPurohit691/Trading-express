
import { createClient, type RedisClientType } from "redis"
export const pub: RedisClientType = createClient({
  url: process.env.redis_Url || "redis://localhost:6379",
})
export const sub: RedisClientType = pub.duplicate()

export async function connectredis() {
  await sub.connect()
}


