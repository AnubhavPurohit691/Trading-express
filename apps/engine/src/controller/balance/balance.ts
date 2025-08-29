import type { Request, Response } from "express";
import { users } from "../..";
import type { AuthenticatedRequest } from "../../middleware/middleware";

export const getbalance =(req:AuthenticatedRequest,res:Response)=>{
    const userId=req.userId
    if(!userId)return;
    const user = users.find((data)=>{
        data.Id===userId
    })
    if(!user)return
     res.json({balance:user.balance,Id:user.Id,username:user.username})
}