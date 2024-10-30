const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');
const infoRoutes = require('./routes/info'); // Import route info

const app = express();
app.use(express.json());

const PORT = process.env.APP_PORT || 4000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Đã kết nối tới MongoDB");
  })
  .catch((error) => {
    console.error("Không thể kết nối tới MongoDB", error);
  });

app.get('/', (req, res) => {
  res.send('API đang chạy...');
});

app.use('/auth', authRoutes);
app.use('/info', infoRoutes); // Sử dụng route info cho endpoint /info

app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
