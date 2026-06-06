import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import connectDB from './src/config/db.js';
import errorHandler from './src/middleware/errorHandler.js';
import socketAuth from './src/middleware/socketAuth.js';
import authRoutes from './src/routes/authRoutes.js';

const app = express();
const httpServer = createServer(app);

const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
const port = process.env.PORT || 5000;

const io = new SocketServer(httpServer, {
  cors: {
    origin: clientUrl,
    credentials: true,
  },
});

app.use(
  cors({
    origin: clientUrl,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'WhisprX server is running',
  });
});

app.use('/api/auth', authRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.use(errorHandler);

io.use(socketAuth);

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.userId} (${socket.userRole})`);

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.userId}`);
  });
});

const startServer = async () => {
  await connectDB();

  httpServer.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error.message);
  process.exit(1);
});

export { app, io };
