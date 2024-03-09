import nodemailer from 'nodemailer';

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  secure: false, // Set to true if using SSL
  auth: {
    user: 'your_email@example.com',
    pass: 'your_password'
  }
});

// Function to send OTP email
const sendOTPEmail = async (email: string, otp: string) => {
  try {
    const mailOptions = {
      from: 'your_email@example.com',
      to: email,
      subject: 'Your OTP for Forget Password',
      text: `Your OTP is: ${otp}`
    };

    await transporter.sendMail(mailOptions);
    console.log('OTP email sent successfully');
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('Failed to send OTP email');
  }
};

export default sendOTPEmail;
