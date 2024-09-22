const express = require("express");
const authRouter = express.Router();
const { handleSignUpUser } = require("../controllers/authControllers");

authRouter.route("/").post(handleSignUpUser);

module.exports = { authRouter };
