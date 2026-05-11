import express from "express";
import { createBooking } from "../controllers/bookingController";
import { authMiddleware } from "../middleware/auth.js";
import checkAvailabilityofCar from "../controllers/bookingController.js";
import { getUserBookings } from "../controllers/bookingController.js";
import { getOwnerBookings } from "../controllers/bookingController.js";
import { cancelBooking } from "../controllers/bookingController.js";
import { changeBookingStatus } from "../controllers/bookingController.js";




const bookingRouter=express.Router();

bookingRouter.post('/book',authMiddleware,createBooking);
bookingRouter.post('/check-availability',authMiddleware,checkAvailabilityofCar);
bookingRouter.get('/my-bookings',authMiddleware,getUserBookings);
bookingRouter.get('/owner-bookings',authMiddleware,getOwnerBookings);
bookingRouter.post('/cancel-booking',authMiddleware,cancelBooking);
bookingRouter.post('/change-booking-status',authMiddleware,changeBookingStatus);

export default bookingRouter;