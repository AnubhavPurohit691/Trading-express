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
            usd: 100000
        },
        orders: [],
        positions:[]
    })
    return res.status(201).json({ userId })
}
export const signincontroller = (req:Request,res:Response)=>{
    const userId = req.query.userId
    if(!userId ){
        return res.status(400).json({ error: "username and password required" })
    }
    const user = users.find((u)=> u.Id === userId)
    return res.json({ user})
}