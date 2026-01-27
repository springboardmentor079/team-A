import express from 'express';
import { 
  registerAdmin, 
  loginAdmin, 
  forgotPasswordAdmin, 
  resetPasswordAdmin 
} from '../controllers/adminController.js';

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.post('/forgot-password', forgotPasswordAdmin);
router.put('/reset-password/:token', resetPasswordAdmin);

export default router;
