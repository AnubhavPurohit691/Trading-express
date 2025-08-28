import { Router } from "express";
import { signincontroller, signupcontroller } from "../controller/authcontroller";
import { getordercontroller } from "../controller/order/orderController";
import { getbalance } from "../controller/balance/balance";
import { orderclose, orderopen } from "../controller/order/order";
const router = Router()
router.post("/signup",signupcontroller)
router.post("/signin",signincontroller)
router.get("/getorder",getordercontroller);
router.post("/order/open",orderopen);
router.get("/balance",getbalance)
router.post("/order/close",orderclose)


export default router;