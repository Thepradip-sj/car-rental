import express from 'express';
import { registerUser,loginUser,getUserData } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/auth.js';

const userRouter=express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.get('/data',authMiddleware,getUserData);

export default userRouter;