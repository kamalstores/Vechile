import express from 'express';
import { protect } from '../middleware/auth.js';
import { changeRoleToOwner } from '../controllers/ownerController.js';

const ownerRouter = express.Router();


// route
ownerRouter.post('/change-role', protect, changeRoleToOwner)

export default ownerRouter;