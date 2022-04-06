const jwbt = require("jsonwebtoken");
const config = require("config");
module.exports = function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) res.status(401).send("Access denied, no token was provided.");

  try {
    const decodedPayload = jwbt.verify(token, config.get("jwtPrivateKey"));
    req.user = decodedPayload;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
