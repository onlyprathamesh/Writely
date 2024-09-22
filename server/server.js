require("dotenv").config();
const express = require("express");
const { connectDB } = require("./utils/db");
const app = express();

const PORT = process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
});
