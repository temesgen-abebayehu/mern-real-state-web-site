import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectMongoDB from './db/connectMongoDB.js';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

const PORT = process.env.PORT || 5000;

//routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
    connectMongoDB();
});