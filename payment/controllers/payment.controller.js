import Payment from "../models/payment.model.js"
import User from "../models/user.model.js"

export const addMoney=async(req,res)=>{
    try{
        const {amount}=req.body;
        if(amount<=0){
            return res.status(400).json({success:false,message:"Enter a valid amount"});
        }
        req.user.balance+=amount;
        await req.user.save();
        return res.status(200).json({success:true,message:"Ammount added successfully",AvailableBalance:req.user.balance});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({success:false,message:"Something went wrong"});
    }
}

export const sendMoney =async (req,res)=>{
    try{
        const {receiverName, amount} =req.body;
    
        if(amount<=0){
            return res.status(400).json({success:false,message:"Enter a valid amount"});
        }
        const receiver=await User.findOne({userName:receiverName});
        if(!receiver){
            return res.status(400).json({success:false,message:"Receiver Not found"});
        }
        if(req.user.balance < amount){
            return res.status(400).json({success:false, message:"Insufficient balance"});
        }
        req.user.balance=req.user.balance- Number(amount);
        receiver.balance+=amount;
        await req.user.save();
        await receiver.save();
        const transaction=new Payment({
            senderId:req.user._id,
            receiverId:receiver._id,
            amount
        })

        await transaction.save();
        return res.status(200).json({success:true,message:"Money send successfully"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({success:false,message:"Something went wrong"});
    }
}

export const history= async(req,res)=>{
    try{
        const history=await Payment.find({$or:[{senderId:req.user._id},{receiverId:req.user._id}]}).sort({date:-1}).populate("senderId").populate("receiverId")

        res.status(200).json({success:true,history})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({success:false,message:"Something went wrong"});
    }
}