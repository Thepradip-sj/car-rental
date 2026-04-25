import User from "../models/User.js";
import fs from 'fs';

export const changeRoleToOwner=async (req,res)=>{
    try{
        const {_id}=req.user;
        await User.findByIdAndUpdate(_id,{role:'owner'});
        res.json({success:true,message:"Now you can list cars"})
    }catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message})

    }
}

//API to list cars..

export const addCar=async(req,res)=>{
    try{
        const {_id}=req.user;
        let car=JSON.parse(req.body.carData);
        const imageFile=req.File;
        //upload image to imagekit and get the url
        const fileBuffer=fs.readFileSync(imageFile.path);
        await imagekit.upload({
            file:fileBuffer,
            fileName:imageFile.originalname,
            folder:'cars'
        })
    }catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
}
