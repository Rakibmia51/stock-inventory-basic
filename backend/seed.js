const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const User = require("./models/user"); // পাথের বানান ঠিক আছে তো?

require('dotenv').config();

async function dbConnection() {
  try {
    await mongoose.connect(process.env.DBURL);
    console.log('Connected to MongoDB successfully');

    // চেক করা শুরু হচ্ছে
    console.log('Checking if admin exists...');
    const adminExists = await User.findOne({ email: "admin@gmail.com" });

    if (!adminExists) {
      console.log('Admin not found. Creating admin...');
      const password = await bcrypt.hash("123456", 10);
      
      const newAdmin = await User.create({
        name: "Admin",
        email: "admin@gmail.com",
        password: password,
        address: "Admin Address",
        role: "admin"
      });
      
      console.log("Admin user created successfully:", newAdmin);
    } else {
      console.log("Admin user already exists in database.");
    }

  } catch (err) {
    console.error('Database/Seeding error:', err);
    throw err; // মেইন ফাইলকে এরর পাস করা
  }
}

module.exports = dbConnection;
