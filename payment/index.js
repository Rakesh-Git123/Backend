import express from "express";
import dotenv from "dotenv"
import { connectToMongo } from "./config/db.js";
import userRoutes from "./routes/user.route.js"
import paymentRoutes from "./routes/payment.route.js"
const app=express();
dotenv.config()

app.use(express.json());

app.use("/api/auth",userRoutes)
app.use("/api/payment",paymentRoutes)

app.listen(4000,()=>{
    connectToMongo();
    console.log("Server running at port 4000");
})