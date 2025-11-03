import express from 'express';
import { getCars, getUserData, loginUser, registerUser } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

// Create a router instance
const userRouter = express.Router();

// Register user route
userRouter.post('/register', registerUser)

// Login user route
userRouter.post('/login', loginUser)

// Get user data route via token
userRouter.get('/data', protect, getUserData)

// get all cars
userRouter.get('/cars', getCars)

export default userRouter;