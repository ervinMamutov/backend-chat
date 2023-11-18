import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';

import logger from './middleware/logger.js';
import connectToDB from './config/db.js';
import userRoutes from './routes/user.js';

dotenv.config();
connectToDB();
const PORT = process.env.PORT || 3005;

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5137',
    credentials: true
  })
);

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(userRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.use('*', (req, res) => {
  res.status(404).json('Page not Found');
});

const server = app.listen(PORT, () => {
  console.log(`Server is up running on port ${PORT}`);
});

// socket.io
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5137'
  }
});

io.on('connection', (socket) => {
  console.log(`user connected ${socket.id}`);

  // join room
  socket.on('joinRoom', (data) => {
    socket.join(data.room);
    console.log(`${data.name} joined room ${data.room}`);
  });

  // message
  socket.on('newMessage', (data) => {
    console.log(data);
    io.to(data.room).emit('getMessage', data);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected ${socket.id}`);
  });
});
