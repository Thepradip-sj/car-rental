import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { changeRoleToOwner, getDashboardData, updateUserImage } from '../controllers/ownerController.js';
import { addCar } from '../controllers/ownerController.js';
import upload from '../middleware/multer.js';
import multer from 'multer';
import imageKit from '../configs/imageKit.js';  

const ownerRouter=express.Router();
ownerRouter.post('/change-role',authMiddleware,changeRoleToOwner);
ownerRouter.post('/add-car',upload.single('image'),authMiddleware, addCar);
ownerRouter.get('/my-cars',authMiddleware,getOwnerCars);
ownerRouter.get('/dashboard',authMiddleware,getDashboardData);
ownerRouter.post("/toggle-car",authMiddleware,toggleCarAvailability);
ownerRouter.post("/delete-car",authMiddleware,deleteCar);

ownerRouter.post('/update-user-image',upload.single('image'),authMiddleware, updateUserImage);


export default ownerRouter;