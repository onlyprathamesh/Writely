const express = require("express");
const authRouter = express.Router();
const { handleSignUpUser, handleSignInUser, handleGoogleAuth } = require("../controllers/authControllers");

authRouter.route("/signup").post(handleSignUpUser);
authRouter.route("/signin").post(handleSignInUser);
authRouter.route("/google").post(handleGoogleAuth);

module.exports = { authRouter };
