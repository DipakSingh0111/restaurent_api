const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDb = require('./config/database');
const authRoutes = require('./routes/authRoutes')


const app = express();
// dotenv config call
dotenv.config();

// databse connection
connectDb();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


// routes
app.use('/api/v1/auth',authRoutes )

const PORT = process.env.PORT || 4000

app.listen(PORT, ()=>{
    console.log(`Server Running on PORT ${PORT}`)
});