import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import assessmentRoutes from "./routes/assessmentRoutes.js";
import errorHandler from "./Middleware/errorHandler.js";

dotenv.config();

const app = express();
app.use(express.json());
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/assessments", assessmentRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
