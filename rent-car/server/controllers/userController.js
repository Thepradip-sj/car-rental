import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken=(userId)=>{
    const payload=userId;
    return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'7d'});
}


//user registration

export const registerUser=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        if(!name || !email || !password || password.length < 8){
            return res.json({success:false,message:'Fill all the  fields and password must be atleast 8 characters long'})
        }
        const userExists=await User.findOne({email});
        if(userExists){
            return res.json({success:false,message:'User already exists'})
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user=await User.create({
            name,
            email,
            password:hashedPassword
        });
        const token=generateToken(user._id.toString());
        res.json({success:true,token});

    }catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
    }


//user login
export const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.json({success:false,message:'Fill all the  fields'});
        }
        const user=await User.findOne({email});
        if(!user){
            return res.json({success:false,message:'user not found'});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:'Invalid credentials'});
        }
        const token=generateToken(user._id.toString());
        res.json({success:true,token});
    }catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}