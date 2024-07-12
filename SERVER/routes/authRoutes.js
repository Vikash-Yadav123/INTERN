import express from 'express';
import { forgetPasswordController, loginController, registerController } from '../controller/authController.js';
const router = express.Router();

// USER REGISTERATION || METHOD POST
router.post('/register', registerController);


// USER LOGIN || METHOD POST
router.post('/login', loginController);

// FORGET PASSWORD || METHOD PUT
router.put('/forget-password', forgetPasswordController);
export default router;