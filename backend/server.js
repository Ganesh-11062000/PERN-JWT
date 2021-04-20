const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/auth',require('./routes/jwtAuth'));
app.use('/dashboard',require('./routes/dashboard'));

app.listen(process.env.PORT || 5000,() => {
    console.log('Server is running...');
})