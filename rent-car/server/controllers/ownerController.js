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
        const imageFile=req.file;
        //upload image to imagekit and get the url
        const fileBuffer=fs.readFileSync(imageFile.path);
        const response=await imagekit.upload({
            file:fileBuffer,
            fileName:imageFile.originalname,
            folder:'/cars'
        })

        //optimization through imageKit URL transformation
        var optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                { width: '1280'},
                {quality:'auto'},
                {format:'webp'}
            ]
        });
        const image=optimizedImageUrl;
        await Car.create({  ...car,
                            image,
                            owner:_id
                        });
        res.json({success:true,message:"Car added successfully"})
    }catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
}
