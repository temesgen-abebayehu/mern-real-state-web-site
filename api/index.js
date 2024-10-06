import express from 'express';

const app = express();

const PORT = 8000;

app.get('/', (req, res)=>{
    res.send("helo server");
});

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});