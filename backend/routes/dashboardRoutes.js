import express from "express";
import User from "../models/user.js";
import auth from "../Middleware/auth.js";

const router = express.Router();

// Get user health scores
router.get("/scores", auth, async (req, res) => {
  const userId = req.user;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ scores: user.scores });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;

