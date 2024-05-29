const usersModel = require("../../../models/user.model.js");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const jwtManager = require("../../../managers/jwtManager.js");
const emailManager = require("../../../managers/emailManager.js");
const register = async (req, res) => {
  try {
    const { full_name, email, password, confirm_password, balance } = req.body;

    if (!full_name) throw new Error("Name is required!");

    if (!email) throw new Error("Email is required!");

    const getDuplicateEmail = await usersModel.findOne({ email: email });
    if (getDuplicateEmail) throw new Error("This email is already exists!");

    if (!password) throw new Error("Password is required!");

    if (password !== confirm_password)
      throw new Error("Password and confirm password must be same!");

    const hashedPassword = await bcrypt.hash(password, 12);
    const response = await usersModel.create({
      full_name: full_name,
      email: email,
      password: hashedPassword,
      balance: balance,
    });
    const accessToken = await jwtManager(response);

    await emailManager(
      response.email,
      "Welcome to expense tracker pro. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "Welcome to expense tracker pro"
    );

    res.status(200).json({
      status: "success",
      message: "Registration successfully.",
      response,
      accessToken,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = register;
