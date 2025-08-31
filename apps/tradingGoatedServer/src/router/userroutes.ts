import { Router } from "express";
import { signincontroller, signupcontroller } from "../controller/authcontroller";
import { getordercontroller } from "../controller/order/getordercontroller.ts";
import { getbalance } from "../controller/balance/balance";
// import { orderclose, orderopen } from "../controller/order/order";
import { authmiddleware } from "../middleware/middleware";
import { getcandlesController } from "../controller/candles/getcandlesController";
import { closedtrade, dotrading, gettrades } from "../controller/order/order";
const router = Router()
router.post("/signup", signupcontroller)
router.post("/signin", signincontroller)
router.get("/getorder", authmiddleware, getordercontroller);
router.get("/balance", authmiddleware, getbalance);
router.get("/candles", getcandlesController)
router.post("/trade", authmiddleware, dotrading)
router.get("/trades/open", authmiddleware, gettrades)
router.post("/trades", authmiddleware, closedtrade)

export default router;
