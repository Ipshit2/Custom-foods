import { createOrder, getallOrder, getmyOrder } from "../controllers/order.controller.js";
import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { isAdmin } from "../middlewares/isAdmin.js";
const router = Router()


router.route("/create").post(verifyToken,createOrder)
router.route("/myorder").get(verifyToken,getmyOrder)
router.route("/allorder").get(isAdmin,getallOrder)


export default router