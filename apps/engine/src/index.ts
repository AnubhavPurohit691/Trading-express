import express from "express"
import "dotenv/config"
import cors from "cors"
import userrouter from "./router/userroutes"
import type { Order, Position } from "./types/type"
import cookieParser from "cookie-parser"
type User={
    Id:string,
    username:string,
    password:string,
    balance :{
        coins:{},
        usd:number
    },
    orders:Order[],
    positions:Position[]
}

const app = express()
app.use(express.json())
export const users:User[]=[]
app.use(cors())
app.use(cookieParser())
app.get("/healthcheck",(req,res)=>{
    res.send("heathcheck is working")
})
app.use("/v1",userrouter)
app.listen(5000)

