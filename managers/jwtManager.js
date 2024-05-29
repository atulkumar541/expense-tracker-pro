const jsonwebtoken = require("jsonwebtoken");

const jwtManager = (user) => {
  const payload = {
    _id: user._id,
    name: user.full_name,
  };

  const accessToken = jsonwebtoken.sign(payload, process.env.JWT_SECRATE);
  return accessToken;
};

module.exports = jwtManager;
