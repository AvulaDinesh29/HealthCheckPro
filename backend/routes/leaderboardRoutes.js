import express from "express";
import User from "../models/user.js";
import auth from "../Middleware/auth.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find({}, { username: 1, scores: 1, updatedAt: 1 })
      .sort({ "scores.overallScore": -1 })
      .limit(10); 

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;

