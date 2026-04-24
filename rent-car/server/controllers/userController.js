import User from "../models/User.js";

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
        return res.json({success:true,message:'User registered successfully',user});

    }catch(error){
        return res.json({success:false,message:'Error occurred while registering user'})
    }
    }
