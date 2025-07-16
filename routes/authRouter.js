import express from 'express';
import { emailValidation } from '../middleware/emailValidation.js';
import { phoneValidation } from '../middleware/phoneNumberValidation.js';
import { userLogin } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', emailValidation, userLogin);

export default router;
