//imports
import express from 'express';
import { PORT } from './config/env.js';

const app =  express();

//middleware
app.use(express.json);

// start the server and listen on the assigned port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
