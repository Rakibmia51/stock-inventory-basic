const express = require('express');
const dbConnection = require('./seed');
const cors = require("cors");
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/Category');
const supplierRoutes = require('./routes/Supplier');
const productsRoutes = require('./routes/Products');
const usersRoutes = require('./routes/user');
const orderRoutes = require('./routes/order');
const dashboardRoutes = require('./routes/dashboard');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/supplier', supplierRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/dashboard', dashboardRoutes);

// ডাটাবেজ কানেক্ট এবং সার্ভার স্টার্ট করার জন্য async ফাংশন
async function startServer() {
  try {
    // ১. প্রথমে ডাটাবেজ কানেক্ট হবে এবং অ্যাডমিন চেক/ক্রিয়েট করবে
    await dbConnection();
    
    // ২. ডাটাবেজ সফলভাবে কানেক্ট হলে সার্ভার লিসেন করবে
    app.listen(port, () => {
      console.log(`Inventory app listening on port http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
}

// ফাংশনটি কল করুন
startServer();
