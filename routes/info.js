// routes/info.js
const express = require('express');
const router = express.Router();

// Endpoint để lấy thông tin cá nhân
router.get('/', (req, res) => {
  res.json({
    data: {
      fullName: "Ngo Gia Huy",
      studentCode: "QE170113"
    }
  });
});

module.exports = router;
