import type { Response,Request } from "express";
import { users } from "../..";

export const getordercontroller=(req:Request,res:Response)=>{
    const userId= req.query.userId
    if(!userId)return;
   const user= users.find((data)=>data.Id===userId)
   const orders = user?.orders
   res.json({
    orders
   })
}