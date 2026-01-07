// ---------------------------
// SERVER ENTRY POINT
// ---------------------------

import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from  "./routes/auth.route.js";
import categoryRoutes from  "./routes/category.route.js";

dotenv.config();  // Load environment variables from .env file
connectDB();   // Connect to MongoDB

const app = express();
const PORT = process.env.PORT || 5001;    // Define PORT from .env or fallback to 5001

app.use(cors());            // Enable CORS for all routes
app.use(express.json());    // Middleware to parse JSON bodies

// Import and use routes
app.use("/api/v1", authRoutes)
app.use("/api/v1", categoryRoutes)

// Start the server
app.listen(PORT, () => {
    console.log(
        `✅ Server running on PORT ${PORT} in ${process.env.DEV_MODE} mode`
    );
});
