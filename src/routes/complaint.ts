import express from 'express';
import forgetPasswordController from '../controllers/forgetpass';
import complaint from '../controllers/complaint';

const router = express.Router();

router.post('/forget-password', forgetPasswordController.forgetPassword);
router.get('/complaints', complaint.getComplaints);

export default router;
