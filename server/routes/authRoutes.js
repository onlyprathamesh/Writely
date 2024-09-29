const express = require("express");
const authRouter = express.Router();
const { handleSignUpUser, handleSignInUser } = require("../controllers/authControllers");

authRouter.route("/signup").post(handleSignUpUser);
authRouter.route("/signin").post(handleSignInUser);

module.exports = { authRouter };
