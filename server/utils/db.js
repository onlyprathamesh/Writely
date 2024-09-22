const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    mongoose.connect(URI);
    console.log("Connected to Database.");
  } catch (error) {
    console.log("Database connection failed.");
  }
};

module.exports = { connectDB };
