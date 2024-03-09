import express from 'express';
import authController from '../controllers/authController';
import complaint from '../controllers/complaint';

const router = express.Router();
router.post('/signUp', authController.signUpAdmin);
router.post('/signUp', authController.signUp);
router.post('/signIn',authController.signIn);
router.post('/verify-otp',authController.verifyOTP);
router.post('/resend-otp', authController.resendOTP);
router.post('/submit', complaint.submitComplaint);
router.get('/complaints/:id', complaint.getComplaintDetails);
router.delete('/complaints/:id', complaint.deleteComplaint);
router.post('/change-password', authController.changePassword);
export default router;
