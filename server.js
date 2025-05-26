// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db.js');

// dotenv.config();
// connectDB();

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// app.use(express.json());

// // Routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/student', require('./routes/student'));
// app.use('/api/employer', require('./routes/employer'));
// app.use('/api/jobs', require('./routes/job'));
// app.use('/api/chat', require('./routes/chat'));

// // Socket.IO for real-time chat
// io.on('connection', (socket) => {
//   console.log('New client connected');

//   socket.on('join', ({ userId, jobId }) => {
//     socket.join(jobId);
//     console.log(`User ${userId} joined room ${jobId}`);
//   });

//   socket.on('sendMessage', async (data) => {
//     const { senderId, receiverId, jobId, content } = data;
//     try {
//       const message = new (require('./models/Message'))({
//         sender: senderId,
//         receiver: receiverId,
//         job: jobId,
//         content,
//       });
//       await message.save();
//       io.to(jobId).emit('message', message);
//     } catch (error) {
//       console.error('Error saving message:', error);
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));



const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const cors = require('cors'); // Add this line

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// Configure CORS for Socket.IO to allow requests from any origin
const io = socketIo(server, {
  cors: {
    origin: '*', // Allow requests from any origin
    methods: ['GET', 'POST'], // Allow these HTTP methods
  },
});

// Enable CORS for Express routes to allow requests from any origin
app.use(cors({
  origin: '*', // Allow requests from any origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
}));

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/student', require('./routes/student'));
app.use('/api/employer', require('./routes/employer'));
app.use('/api/jobs', require('./routes/job'));
app.use('/api/admin', require('./routes/admin')); // Admin routes
app.use('/api/chat', require('./routes/chat'));

// Socket.IO for real-time chat
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('join', ({ userId, jobId }) => {
    socket.join(jobId);
    console.log(`User ${userId} joined room ${jobId}`);
  });

  socket.on('sendMessage', async (data) => {
    const { senderId, receiverId, jobId, content } = data;
    try {
      const message = new (require('./models/Message'))({
        sender: senderId,
        receiver: receiverId,
        job: jobId,
        content,
      });
      await message.save();
      io.to(jobId).emit('message', message);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));