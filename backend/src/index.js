import dotenv from "dotenv"

import {app} from './app.js'
dotenv.config({
    path: './.env'
})
import connectDB from "./db/db.config.js"

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8080, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
        console.log(process.env.PORT);
        
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})
