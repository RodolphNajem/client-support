import nodemailer from 'nodemailer';

export const sendOTPByEmail = async (email: string, otp: string): Promise<boolean> => {
  try {
    
    const transporter = nodemailer.createTransport({
      
    });

    // Send email with OTP
    await transporter.sendMail({
      from: 'your_email@example.com',
      to: email,
      subject: 'Your OTP for Password Reset',
      text: `Your OTP is: ${otp}`,
    });

    return true;
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return false;
  }
};

export const generateOTP = (): string => {
  
  return Math.floor(100000 + Math.random() * 900000).toString();
};
