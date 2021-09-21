/** set of middlewares */
const jwt = require("jsonwebtoken");
const { errorResponse } = require("../helper")

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.headers["x-access-token"]; // can be added through the body paramters or in the headers

  if (!token) {
    return errorResponse("A token is required for authentication",403, res);

  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return errorResponse("Invalid Token",401, res);
  }
  return next();
};

module.exports.authentication = verifyToken;