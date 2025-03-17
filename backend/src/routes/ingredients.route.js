import { register, getingredients } from "../controllers/ingredients.controller.js";
import { Router } from "express";
import { upload } from "../middlewares/multer.js";

const router = Router()


router.route("/register").post(upload,register)
router.route("/getall").get(getingredients)


export default router