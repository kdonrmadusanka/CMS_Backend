//imports
import express from 'express';
import { PORT } from './config/env.js';
import connectDB from './config/db.js';
import facultyRoutes from './routes/facultyRoutes.js';
import authRoutes from './routes/authRouter.js';

const app =  express();

//middleware
app.use(express.json());

//routes
app.use('/api/faculty', facultyRoutes);
app.use('/api/user', authRoutes);

connectDB();

// start the server and listen on the assigned port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
