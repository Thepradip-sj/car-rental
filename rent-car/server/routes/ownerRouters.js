import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { changeRoleToOwner } from '../controllers/ownerController.js';

const ownerRouter=express.Router();

ownerRouter.post('/change-role',authMiddleware,changeRoleToOwner);

export default ownerRouter;