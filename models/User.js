// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },      // Tên đầy đủ của người dùng
    username: { type: String, unique: true, required: true }, // Tên đăng nhập duy nhất
    password: { type: String, required: true }       // Mật khẩu mã hóa
});

module.exports = mongoose.model('User', userSchema);
