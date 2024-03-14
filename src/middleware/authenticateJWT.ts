import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User'; // Import your User model

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    jwt.verify(token, 'your_secret_key', async (err, decoded: any) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      // Fetch user details from the database using the user ID from the token
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      // Attach the user ID to the request object
      (req as any).userId = decoded.userId;
      next();
    });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export default authenticateJWT;
