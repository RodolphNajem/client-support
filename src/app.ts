import express, { Application, Request, Response, NextFunction } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import authRoutes from './routes/auth';
import complaintRoutes from './routes/complaint';
import adminRoutes from './routes/admin';
import authenticateJWT from './middleware/authenticateJWT';
import bodyParser from 'body-parser';


const app : Application = express();
const server = http.createServer(app);
const io = new Server(server);

//initialize socket.io connections

io.on('connection', (socket:any)=>{
    console.log('A user is connected');

//handle disconnections
socket.on('disconnect',()=>{
    console.log('user disconnected');
});

});

const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/your-database';

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/complaints', authenticateJWT, complaintRoutes);
app.use('/api/admin', authenticateJWT, adminRoutes); 

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/audio-library')
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    app.listen(3000, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

export default (app);