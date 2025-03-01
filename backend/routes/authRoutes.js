const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Vendor = require("../models/Vendor");

const router = express.Router();

// USER SIGNUP ROUTE
router.post("/user/signup", async (req, res) => {
  try {
    console.log("🔹 Signup request received:", req.body);

    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("❌ User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    console.log("✅ Saving new user:", newUser);
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("❌ Signup error:", error);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
