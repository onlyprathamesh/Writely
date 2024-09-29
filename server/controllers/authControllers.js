const { customError } = require("../middlewares/errorHandler.js");
const { User } = require("../models/userModel.js");
const jwt = require("jsonwebtoken");

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

const handleSignInUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(customError(400, "All fields are required."));
  }
  try {
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return next(customError(401, "Could not find user."));
    }
    console.log("USER", password);
    const validUser = await userExists.comparePassword(password);

    if (!validUser) {
      return next(customError(401, "Invalid credentials."));
    }
    const token = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET_KEY);
    res
      .status(200)
      .cookie("accecc-token", token, { httpOnly: true })
      .json({ message: "Succussfully Logged In." });
  } catch (error) {
    next(error);
  }
};

module.exports = { handleSignUpUser, handleSignInUser };
