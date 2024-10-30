// routes/auth.js
const express = require('express');
const { register, login } = require('../controllers/authController'); // Import các hàm từ authController
const router = express.Router();

// Route đăng ký người dùng
router.post('/register', register);

// Route đăng nhập người dùng
router.post('/login', login);

module.exports = router;
