import User from "../models/User.js";
import fs from 'fs';
import imageKit from "../configs/imageKit.js";

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
        const response=await imageKit.upload({
            file:fileBuffer,
            fileName:imageFile.originalname,
            folder:'/cars'
        })

        //optimization through imageKit URL transformation
        var optimizedImageUrl = imageKit.url({
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
//API to get all cars of an owner
export const getOwnerCars=async(req,res)=>{ 
    try{
        const {_id}=req.user;   
        const cars=await Car.find({owner:_id});
        res.json({success:true,cars});
    }catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
}
//API to Toggle Car Availability
export const toggleCarAvailability=async(req,res)=>{
    try{
        const {_id}=req.user;
        const {carId}=req.body;
        const car=await Car.findById(carId);
        //check if the car belongs to the owner
        if(car.owner.toString()!==_id.toString()){
            return res.json({success:false,message:'You are not authorized to perform this action'})
        }
        car.available=!car.available;
        await car.save();
        res.json({success:true,message:'Car availability toggled successfully'});
    }catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
}

//API to Delete a Car
export const deleteCar=async(req,res)=>{
    try{
        const {_id}=req.user;
        const {carId}=req.body;
        const car=await Car.findById(carId);
        //check if the car belongs to the owner
        if(car.owner.toString()!==_id.toString()){
            return res.json({success:false,message:'You are not authorized to perform this action'});
        }
        car.owner=null;
        car.isAvailable=false;
        await car.save();
        res.json({success:true,message:'Car deleted successfully'});
    }catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
}

export const getDashboardData=async(req,res)=>{
    try{
        const {_id,role}=req.user;
        if(role!=='owner'){
            return res.json({success:false,message:'You are not authorized to access this data'});
        }
        const cars=await Car.find({owner:_id});
        const bookings=await Booking.find({owner:_id}).populate('car').sort({createdAt:-1});
        const pendingBookings=await Booking.find({owner:_id,status:'pending'});
        const completedBookings=await Booking.find({owner_id:_id,status:'confirmed'});
        const monthlyRevenue=await bookings.slice().filter(booking=>booking.status==='confirmed').reduce((acc,booking)=>acc+booking.price,0);
        const dashboardData={
            totalCars:cars.length,
            totalBookings:bookings.length,
            pendingBookings:pendingBookings.length,
            completeBookings:completedBookings.length,
            recentBookings:bookings.slice(0,3),
            monthlyRevenue
        }
        res.json({success:true,cars,bookings,pendingBookings,completedBookings,monthlyRevenue});


    }catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
}

//API to update user image
export const updateUserImage=async(req,res)=>{
    try{

        const {_id}=req.user;
        //upload image to file Buffer
        const fileBuffer=fs.readFileSync(imageFile.path);
        const response=await imageKit.upload({
            file:fileBuffer,
            fileName:imageFile.originalname,
            folder:'/cars'
        })

         //optimization through imageKit URL transformation
        var optimizedImageUrl = imageKit.url({
            path: response.filePath,
            transformation: [
                { width: '400'},
                {quality:'auto'},
                {format:'webp'}
            ]
        });
        const image=optimizedImageUrl;
        await User.findByIdAndUpdate(_id,{image});
        res.json({success:true,message:'Profile image updated successfully',image});

    }catch(error){
        res.json({success:false,message:error.message})
    }
}

