import type { Request, Response } from "express"
import { users } from ".."
import { randomUUID } from "crypto"

export const signupcontroller =  (req:Request,res:Response)=>{
    
    const data=req.body
    console.log(data)
    const userId = randomUUID()
    users.push({
        Id: userId,
        username: data.username,
        password: data.password,
        balance: {
            coins: {},
            amount: 100000
        },
        orders: []
    })
    return res.status(201).json({ userId })
}
export const signincontroller = (req:Request,res:Response)=>{
    const data = req.body
    if(!data?.username || !data?.password){
        return res.status(400).json({ error: "username and password required" })
    }
    const user = users.find((u)=> u.username === data.username)
    if(!user || user.password !== data.password){
        return res.status(401).json({ error: "invalid credentials" })
    }
    return res.json({ userId: user.Id })
}