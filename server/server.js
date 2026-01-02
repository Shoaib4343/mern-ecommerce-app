// ---------------------------
// SERVER ENTRY POINT
// ---------------------------

import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from  "./routes/auth.route.js";

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Import and use authentication routes
app.use("/api/v1", authRoutes)

// Define a simple test route
app.get("/", (req, res) => {
    res.send("Backend server is working...");
});

// Define PORT from .env or fallback to 5001
const PORT = process.env.PORT || 5001;

// Start the server
app.listen(PORT, () => {
    console.log(
        `✅ Server running on PORT ${PORT} in ${process.env.DEV_MODE} mode`
    );
});
