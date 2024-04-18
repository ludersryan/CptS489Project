const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.M_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`)
}

module.exports =  connectDB;