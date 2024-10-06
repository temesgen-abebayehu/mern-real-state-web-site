import express from 'express';
import dotenv from 'dotenv';

import connectMongoDB from './db/connectMongoDB.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;

app.get('/', (req, res)=>{
    res.send("helo server");
});

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
    connectMongoDB();
});