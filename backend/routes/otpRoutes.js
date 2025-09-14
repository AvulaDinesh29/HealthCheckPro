import express from "express";
import crypto from "crypto";
import nodemailer from "nodemailer";
import OTP from "../models/OTP.js";
import dotenv from "dotenv";

const router = express.Router();

// Ensure environment variables are loaded
dotenv.config();

// Create the Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  debug: true, // Enable debug messages
  logger: true, // Log to console
});

// Send OTP
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes expiry

    // Save the OTP to the database
    await OTP.create({ email, otp, expiresAt: otpExpiry });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "OTP for Password Reset",
      text: `Your OTP for password reset is: ${otp}. This OTP is valid for 5 minutes.`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Error sending OTP", error });
      }

      console.log("OTP email sent:", info.response);
      res.status(200).json({ message: "OTP sent successfully" });
    });
  } catch (error) {
    console.error("Error generating OTP:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Verify OTP
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  try {
    // Find the OTP record in the database
    const otpRecord = await OTP.findOne({ email, otp });

    // Check if the OTP exists and is valid
    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check if OTP has expired
    if (Date.now() > otpRecord.expiresAt) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // If OTP is valid, remove it from the database to prevent reuse
    await OTP.deleteOne({ email, otp });

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;

