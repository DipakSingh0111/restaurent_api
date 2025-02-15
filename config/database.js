const mongoose = require('mongoose');

const connectDb = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to Database Successfully...`);
    } catch (error) {
        console.log('Database Error', error);
    }
};

module.exports = connectDb;