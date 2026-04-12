// app.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import connectDB from './config/db.js'; // adjust path to your DB connection

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // default to 5000 if PORT not defined

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON request bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);

// Connect to database
connectDB();

// Example route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Create HTTP server (useful if adding Socket.IO later)
const httpServer = createServer(app);

const io = initIO(httpServer);

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Use the separate handler
  handleSearchResources(socket);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start the server
httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
