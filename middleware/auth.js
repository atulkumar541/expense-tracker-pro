const jsonwebtoken = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    token = req.headers.authorization.split(" ")[1];
    if (!token) throw new Error("Invalid token");

    const jwtVerification = await jsonwebtoken.verify(
      token,
      process.env.JWT_SECRATE
    );
    req.user = jwtVerification;
  } catch (error) {
    res.status(500).json("Unathorization!");
  }
  next();
};

module.exports = auth;
