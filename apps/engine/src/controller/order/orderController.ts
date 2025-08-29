import type { Response,Request } from "express";
import { users } from "../..";
import type { AuthenticatedRequest } from "../../middleware/middleware";

export const getordercontroller=(req:AuthenticatedRequest,res:Response)=>{
    const userId= req.userId
    if(!userId)return;
   const user= users.find((data)=>data.Id===userId)
   const orders = user?.orders
   res.json({
    orders
   })
}