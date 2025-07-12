import express from "express";
const router=express.Router();
import {isAuthenticated} from "../middleware/isAuthenticated.js"
import {addMoney,sendMoney,history} from "../controllers/payment.controller.js"

router.post("/addMoney",isAuthenticated,addMoney)
router.post("/sendMoney",isAuthenticated,sendMoney)
router.get("/history",isAuthenticated,history)

export default router;