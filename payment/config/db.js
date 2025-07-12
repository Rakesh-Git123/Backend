import mongoose from "mongoose";

export const connectToMongo= async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/payment")
        console.log("Connected Successfully")
    } catch(err){
        console.log(err);
    }
}