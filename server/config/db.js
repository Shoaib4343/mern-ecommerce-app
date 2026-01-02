// ---------------------------
// DATABASE CONNECTION
// ---------------------------

import mongoose from "mongoose";

// Function to connect to MongoDB using Mongoose
const connectDB = async () => {
    try {
        // Connect to MongoDB using the URI from .env
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB connection failed: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
