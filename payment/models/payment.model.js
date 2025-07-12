import mongoose from "mongoose"

const paymentSchema=mongoose.Schema({
    senderId:{type:mongoose.Schema.ObjectId, ref:"user"},
    receiverId:{type:mongoose.Schema.ObjectId, ref:"user"},
    amount:{type:Number, required:true},
    date:{type:Date, default:Date.now()}
})

export default mongoose.model("payment",paymentSchema);