import express from 'express';

import {
   changeRoleToOwner,
   getDashboardData,
   updateUserImage,
   getOwnerCars,
   toggleCarAvailability,
   deleteCar,
   addCar
} from '../controllers/ownerController.js';

import { authMiddleware } from '../middleware/auth.js';

import upload from '../middleware/multer.js';

const ownerRouter = express.Router();

ownerRouter.post(
   '/change-role',
   authMiddleware,
   changeRoleToOwner
);

ownerRouter.post(
   '/add-car',
   authMiddleware,
   upload.single('image'),
   addCar
);

ownerRouter.get(
   '/my-cars',
   authMiddleware,
   getOwnerCars
);

ownerRouter.get(
   '/dashboard',
   authMiddleware,
   getDashboardData
);

ownerRouter.post(
   '/toggle-car',
   authMiddleware,
   toggleCarAvailability
);

ownerRouter.post(
   '/delete-car',
   authMiddleware,
   deleteCar
);

ownerRouter.post(
   '/update-user-image',
   authMiddleware,
   upload.single('image'),
   updateUserImage
);

export default ownerRouter;