import { createOrder } from "../controllers/order.controller.js";
import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
const router = Router()


router.route("/create").post(verifyToken,createOrder)


export default router