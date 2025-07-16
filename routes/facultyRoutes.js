import express from 'express';
import{ emailValidation } from '../middleware/emailValidation.js';
import { phoneValidation } from '../middleware/phoneNumberValidation.js';
import { facultyRegister } from '../controllers/facultyController.js';

const router = express.Router();

router.post('/facultyRegister', emailValidation, phoneValidation, facultyRegister);

export default router;