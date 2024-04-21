import mongoose from 'mongoose';

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.M_URI).catch((err) => {
        console.log(`Error: ${err.message}`)
        process.exit(1)
    })
    console.log(`MongoDB Connected: ${conn.connection.host}`)
}

export default connectDB;