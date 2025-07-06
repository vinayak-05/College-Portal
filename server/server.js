import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/postRoutes.js";
import societyRoutes from "./routes/societyRoutes.js"; // ← move here

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Static folder to serve uploaded images
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/posts", postRoutes);
app.use("/api/societies", societyRoutes);
app.use("/api/auth", authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT, () => console.log(`🚀 Server running on port ${process.env.PORT}`));
  })
  .catch(err => console.error("❌ MongoDB error:", err));
