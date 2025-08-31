import type { Request, Response } from "express"
import { users } from ".."
import { randomUUID } from "crypto"
import jwt from "jsonwebtoken"
import "dotenv/config"
export const signupcontroller = (req: Request, res: Response) => {

  const data = req.body
  console.log(data)
  if (data.username === null && data.password === null) return
  const userId = randomUUID()

  users.push({
    Id: userId,
    username: data.username,
    password: data.password,
    balance: {
      coins: {},
      usd: 100000
    },
    trades: []
  })

  const token = jwt.sign({ userId: userId }, process.env.Secret || "anubhav")
  res.cookie("gettoken", token)
  return res.json({ message: "cookie set", token })
}
export const signincontroller = (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = users.find((u) => u.username === username)
  if (user?.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" })
  }
  if (!user) return;
  const userId = user.Id
  const token = jwt.sign({ userId: userId }, process.env.Secret || "anubhav")
  res.cookie("gettoken", token)
  return res.json({ user })
}
