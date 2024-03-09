import { Request, Response } from 'express';
import sendOTPEmail from '../services/email'; 

const forgetPassword = async (req: Request, res: Response) => {
  try {
    
    const { email } = req.body;

    const otp = '123456'; // thats an example otp

    // Send OTP to the user's email
    await sendOTPEmail(email, otp);

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default { forgetPassword };
