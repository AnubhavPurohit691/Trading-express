import { Router } from "express";
import { signincontroller, signupcontroller } from "../controller/authcontroller";
import { getordercontroller } from "../controller/order/orderController";
import { getbalance } from "../controller/balance/balance";
// import { orderclose, orderopen } from "../controller/order/order";
import { authmiddleware } from "../middleware/middleware";
import { getcandlesController } from "../controller/candles/getcandlesController";
const router = Router()
router.post("/signup", signupcontroller)
router.post("/signin", signincontroller)
router.get("/getorder", authmiddleware, getordercontroller);
// router.post("/order/open", authmiddleware, orderopen);
router.get("/balance", authmiddleware, getbalance);
// router.post("/order/close", authmiddleware, orderclose);
router.get("/candles",  getcandlesController)


export default router;
