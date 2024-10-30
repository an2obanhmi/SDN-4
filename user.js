const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) return res.status(401).json({ success: false, message: "Token is missing or invalid" });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password'); // Không chọn trường password
      if (!req.user) return res.status(401).json({ success: false, message: "User not found" });
      next();
    } catch (error) {
      res.status(401).json({ success: false, message: "Token is missing or invalid" });
    }
};

router.get('/me', authenticateToken, async (req, res) => {
    try {
      // Lấy thông tin người dùng từ req.user (đã được gán trong middleware)
      res.status(200).json({
        success: true,
        data: {
          id: req.user._id,
          fullName: req.user.fullName,
          username: req.user.username
        }
      });
    } catch (error) {
      console.error("Error fetching user information:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

router.put('/me', authenticateToken, async (req, res) => {
    const { fullName } = req.body;
  
    if (!fullName) {
      return res.status(400).json({ success: false, message: "Full name is required" });
    }
  
    try {
      // Cập nhật tên đầy đủ
      req.user.fullName = fullName;
      await req.user.save();
  
      res.status(200).json({
        success: true,
        message: "User information updated successfully",
        data: {
          id: req.user._id,
          fullName: req.user.fullName,
          username: req.user.username,
        }
      });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

module.exports = router;

