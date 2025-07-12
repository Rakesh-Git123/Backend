import mongoose from "mongoose"

const userSchema=mongoose.Schema({
    userName:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    balance:{type:Number, default:0}
})

export default mongoose.model("user",userSchema);