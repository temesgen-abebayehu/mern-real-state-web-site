import express from 'express';
import dotenv from 'dotenv';

import connectMongoDB from './db/connectMongoDB.js';
import userRouter from './routes/user.route.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

//routes
app.use('/api/user', userRouter);


app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
    // connectMongoDB();
});