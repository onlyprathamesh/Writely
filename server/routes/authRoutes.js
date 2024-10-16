const express = require("express");
const authRouter = express.Router();
const { handleSignUpUser, handleSignInUser, handleGoogleAuth, handleUpdateUser } = require("../controllers/authControllers");
const { verifyUser } = require("../middlewares/verifyUser");

authRouter.route("/signup").post(handleSignUpUser);
authRouter.route("/signin").post(handleSignInUser);
authRouter.route("/google").post(handleGoogleAuth);
authRouter.route("/update/:userId").put(verifyUser, handleUpdateUser);

module.exports = { authRouter };
