const jwt = require("jsonwebtoken");
const { customError } = require("./errorHandler");

const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(customError(401, "Unauthorized"));
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return next(customError(401, "Unauthorized"));
    }
    req.user = user;
    next();
  });
};

module.exports = { verifyUser };
