import { Router } from "express";
import { users } from "..";
import { signincontroller, signupcontroller } from "../controller/authcontroller";
const router = Router()
router.post("/signup",signupcontroller)
router.post("/signin",signincontroller)
// router.post("order",ordercontroller);

export default router;