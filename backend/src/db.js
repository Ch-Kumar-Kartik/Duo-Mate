const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

async function connectDB() {
    try {
        await mongoose.connect(process.env.DB_CONN_STRING);
        console.log('Connected to MongoDB database!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit the process with failure
    }
}

module.exports = connectDB;