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
    const validUser = await userExists.comparePassword(password);

    if (!validUser) {
      return next(customError(401, "Invalid credentials."));
    }
    const token = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET_KEY);

    const { password: userPassword, ...rest } = userExists._doc;
    res
      .status(200)
      .cookie("accecc-token", token, { httpOnly: true })
      .json({ message: "Succussfully Logged In.", rest });
  } catch (error) {
    next(error);
  }
};

const handleGoogleAuth = async (req, res, next) => {
  const { name, email, photoURL } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET_KEY);

      const { password: userPassword, ...rest } = userExist._doc;

      res
        .status(200)
        .cookie("access-token", token, { httpOnly: true })
        .json({ message: "Successfully Logged In.", rest });
    } else {
      const tempPassword = Math.random().toString(36).slice(-8);
      const newUser = await User.create({
        username: `${name.toLowerCase().split(" ").join("")}${Math.random().toString(9).slice(-4)}`,
        email,
        password: tempPassword,
        profilePicture: photoURL,
      });

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY);
      const { password: userPassword, ...rest } = newUser._doc;

      res
        .status(200)
        .cookie("access-token", token, { httpOnly: true })
        .json({ message: "Account created successfully.", rest });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { handleSignUpUser, handleSignInUser, handleGoogleAuth };
