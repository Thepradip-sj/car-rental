import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { changeRoleToOwner, getDashboardData, updateUserImage,getOwnerCars,toggleCarAvailability,deleteCar } from '../controllers/ownerController.js';
import { addCar } from '../controllers/ownerController.js';
import upload from '../middleware/multer.js';
import imageKit from '../configs/imageKit.js';  

const ownerRouter=express.Router();
ownerRouter.post('/change-role',authMiddleware,changeRoleToOwner);
ownerRouter.post('/add-car', authMiddleware, upload.single('image'), addCar);
ownerRouter.get('/my-cars',authMiddleware,getOwnerCars);
ownerRouter.get('/dashboard',authMiddleware,getDashboardData);
ownerRouter.post("/toggle-car",authMiddleware,toggleCarAvailability);
ownerRouter.post("/delete-car",authMiddleware,deleteCar);

ownerRouter.post('/update-user-image',upload.single('image'),authMiddleware, updateUserImage);


export default ownerRouter;