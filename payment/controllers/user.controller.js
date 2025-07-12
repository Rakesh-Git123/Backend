import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register=async(req,res)=>{
    try{
        const {userName,password} =req.body;
        const exist= await User.findOne({userName});
        if(exist){
            return res.status(400).json({success:false, message:"User already exist with this email"});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user=new User({userName,password:hashedPassword});
        await user.save();

        res.status(201).json({success:true,message:"User registered successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({success:false, message:"Something went wrong"});
    }
}

export const login=async(req,res)=>{
    try{
        const{userName,password} = req.body;
        const user= await User.findOne({userName});
        if(!user){
            return res.status(404).json({success:false, message:"Invalid credentials"});
        }
        const correct=await bcrypt.compare(password, user.password);
        if(!correct){
            return res.status(400).json({success:false, msssage:"Invalid credentials"})
        }

        const token = jwt.sign(
            { _id: user._id, userName: user.userName },
            process.env.SECRET,
            { expiresIn: "1h" }
          );
        return res.status(200).json({success:true, message:"Logged in successfully",token});

    }
    catch(err){
        console.log(err);
        res.status(500).json({success:false, message:"Something went wrong"});
    }
}