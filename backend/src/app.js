import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const FRONTEND_URL = process.env.FRONTEND_URL || process.env.LOCAL_URL;
const app =express()
app.use(cookieParser())
app.use(cors({
    origin: FRONTEND_URL, 
    credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))


import ingredientsRouter from "./routes/ingredients.route.js"
import customerRouter  from "./routes/customer.route.js"
import orderRouter from "./routes/order.route.js"
import adminRouter from "./routes/admin.route.js"
import aiRouter from "./routes/ai.route.js"

app.use("/ingredient",ingredientsRouter)
app.use("/customer",customerRouter)
app.use("/admin",adminRouter)
app.use("/order",orderRouter)
app.use("/ai",aiRouter)


export {app}