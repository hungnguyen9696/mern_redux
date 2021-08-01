const express = require('express');
const app = express();
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

//connect db
connectDB();

app.get('/', (req, res)=> {
    res.send('server running')
});

app.listen(PORT, () => console.log(`server started on port ${PORT}`));