const usersModel = require("../../../models/user.model.js");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const jwtManager = require("../../../managers/jwtManager.js");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) throw new Error("Email is required!");

    if (!password) throw new Error("Password is required!");

    const getUser = await usersModel.findOne({ email: email });
    if (!getUser) throw new Error("Email does not exists!");

    const comparePassword = await bcrypt.compare(password, getUser.password);

    if (!comparePassword) throw new Error("Email and password does not match!");

    const accessToken = await jwtManager(getUser);

    res.status(200).json({
      status: "success",
      message: "User login successfully.",
      accessToken: accessToken,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
module.exports = login;
