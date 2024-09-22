const { User } = require("../models/userModel.js");
const { customError } = require("../middlewares/errorHandler.js");

const handleSignUpUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !password || !email)
    return next(customError(400, "All fields are required"));
  try {
    await User.create({ username, email, password });
    res.status(201).json({ message: "User created." });
  } catch (error) {
    if (error.code === 11000) {
      return next(customError(400, "Email or username already exists."));
    }
    next(error);
  }
};

module.exports = { handleSignUpUser };
