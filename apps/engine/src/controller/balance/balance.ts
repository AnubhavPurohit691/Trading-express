import type { Request, Response } from "express";
import { users } from "../..";

export const getbalance =(req:Request,res:Response)=>{
    const userId=req.query.userId
    if(!userId)return ;
    const user = users.find((data)=>{
        data.Id===userId
    })
    if(!user)return 
     res.json({balance:user.balance,Id:user.Id,username:user.username})
}