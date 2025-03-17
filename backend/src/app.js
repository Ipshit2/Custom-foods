import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app =express()
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))


import ingredientsRouter from "./routes/ingredients.route.js"
import userRouter from "./routes/user.route.js"
import orderRouter from "./routes/order.route.js"

app.use("/ingredient",ingredientsRouter)
app.use("/user",userRouter)
app.use("/order",orderRouter)


export {app}