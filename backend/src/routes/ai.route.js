import { Router } from "express";
import { generatePizza } from "../controllers/ai.controller.js";

const router = Router()

router.route("/generate").post(generatePizza)


export default router