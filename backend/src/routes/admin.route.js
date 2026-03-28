import { register ,login } from "../controllers/admin.controller.js";
import { Router } from "express";

const router = Router()

router.route("/register").post(register)
router.route("/login").get(login)


export default router