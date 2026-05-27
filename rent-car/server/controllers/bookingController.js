import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

//Function to check if a car is available for the given dates
const checkAvailability = async (car,pickupDate,returnDate) => {
    const bookings= await Booking.find({
        car,
        pickupDate:{$lte:returnDate},
        returnDate:{$gte:pickupDate},
        status:'confirmed'
    });
    return bookings.length === 0;
}
//check availability of cars based on location and dates
export const checkAvailabilityofCar=async(req,res)=>{
    try{
        const {location,pickupDate,returnDate}=req.body;
        const cars=await Car.find({location,available:true});
        const availableCarsPromises=cars.map(async(car)=>{
            const isAvailable=await checkAvailability(car._id,pickupDate,returnDate);
            return {...car._doc,isAvailable:isAvailable};
        });
        const availableCars=await Promise.all(availableCarsPromises);
        res.json(availableCars.filter(car => car.isAvailable===true));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


//API to Create a Booking
export const createBooking=async(req,res)=>{
    try{
        const {carId,pickupDate,returnDate}=req.body;   
        const {_id}=req.user;
        const car=await Car.findById(carId);
        if(!car){
            return res.status(404).json({ message: "Car not found" });
        }

        const isAvailable=await checkAvailability(car._id,pickupDate,returnDate);

        if(!isAvailable){
            return res.status(400).json({ message: "Car is not available for the selected dates" });
        }

        const pickedup=new Date(pickupDate);
        const returned=new Date(returnDate);
        const noOfDays=Math.ceil((returned-pickedup)/(1000*60*60*24));
        const totalPrice=noOfDays*car.pricePerDay;

        const booking=await Booking.create({
            car,
            owner:car.owner,
            user:_id,
            pickupDate,
            returnDate,
            totalPrice
        });   
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


//API to Get Bookings of a User

export const getUserBookings=async(req,res)=>{
    try{
        const {_id}=req.user;
        const bookings=await (await Booking.find({user:_id}).populate('car')).sort({createdAt:-1});
        res.json({success:true,bookings});
    }catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
}

//API to Get Bookings of an Owner
export const getOwnerBookings=async(req,res)=>{
    try{
        if(req.user.role!=='owner'){
            return res.json({success:false,message:'You are not authorized to access this data'});
        }

        const bookings = await Booking.find({ owner: req.user._id })
        .populate('car')
        .populate('user', '-password')
        .sort({ createdAt: -1 });
        res.json({success:true,bookings});
    }catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
}

//API to change booking status by owner
export const changeBookingStatus=async(req,res)=>{
    try{
        const {_id}=req.user;
        const {bookingId,status}=req.body;
        if(req.user.role!=='owner'){
            return res.json({success:false,message:'You are not authorized to perform this action'});
        }
        const booking=await Booking.findById(bookingId);;
        if(booking.owner.toString()!==_id.toString()){
            return res.json({success:false,message:'You are not authorized to perform this action'});
        }
        booking.status=status;
        await booking.save();

res.json({
    success: true,
    message: "Booking status updated successfully"
})

    }catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
}

export const cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.body;

        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.json({
                success: false,
                message: "Booking not found"
            });
        }

        booking.status = "cancelled";
        await booking.save();

        res.json({
            success: true,
            message: "Booking cancelled successfully"
        });

    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        });
    }
};