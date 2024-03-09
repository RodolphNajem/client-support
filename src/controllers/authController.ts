import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const signUpAdmin = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 15);
      const isAdmin = req.body.isAdmin || true;
      const user = new User({ username, password: hashedPassword, isAdmin });
      await user.save();
      const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
      res.status(201).json({ message: 'Admin user created successfully', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

const signUp = async (req: Request, res: Response) => {
  try {
    // Extract required fields from request body
    const { email, firstName, lastName, password, isVIP = false, isAdmin = false } = req.body;
    const hashedPassword = await bcrypt.hash(password, 15);
    const user = new User({ email, firstName, lastName, password: hashedPassword, isVIP, isAdmin });
    await user.save();
    // Create a token for authentication
    const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const signIn = async (req: Request, res: Response) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Wrong password' });
    }
    // Create a token for authentication
    const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '2h' });
    res.status(200).json({ message: 'Sign in successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
const verifyOTP = async (req: Request, res: Response) => {
    try {
      const { email, otp } = req.body;
  
      if ({/* OTP matches */}) {
        res.status(200).json({ message: 'OTP verified successfully' });
      } else {
        res.status(400).json({ message: 'Invalid OTP' });
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      res.status(500).json({ message: 'Failed to verify OTP' });
    }
  };

  const resendOTP = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
  
      // Generate a new OTP
      const newOTP = (req as any).generateOTP();
  
      // Send the new OTP to the user's email
      const otpSent = await (req as any).sendOTPByEmail(email, newOTP);
  
      if (otpSent) {
        res.status(200).json({ message: 'OTP resent successfully' });
      } else {
        res.status(500).json({ message: 'Failed to resend OTP' });
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      res.status(500).json({ message: 'Failed to resend OTP' });
    }
  };
  const changePassword = async (req: Request, res: Response) => {
    try {
      const { userId, currentPassword, newPassword } = req.body;
  
      // Find the user by ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the current password matches
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }
  
      // Hash the new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the user's password
      user.password = hashedNewPassword;
      await user.save();
  
      res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
export default {signUpAdmin, signUp, signIn, verifyOTP,resendOTP,changePassword };