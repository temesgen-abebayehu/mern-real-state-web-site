import express from 'express';
import dotenv from 'dotenv';

import connectMongoDB from './db/connectMongoDB.js';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

//routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);


app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
    connectMongoDB();
});