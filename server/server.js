require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./utils/db");
const { authRouter } = require("./routes/authRoutes");
const { globalError } = require("./middlewares/errorHandler");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use(globalError);

const PORT = process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
});
