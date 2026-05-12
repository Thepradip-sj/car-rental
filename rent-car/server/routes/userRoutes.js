import express from 'express';
import { registerUser,loginUser,getUserData } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/auth.js';
import { getCars } from '../controllers/userController.js';

const userRouter=express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.get('/data',authMiddleware,getUserData);
userRouter.get('/cars',getCars);
export default userRouter;