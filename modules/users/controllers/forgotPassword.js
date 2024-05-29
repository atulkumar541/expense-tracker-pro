const usersModel = require("../../../models/user.model.js");
const emailManager = require("../../../managers/emailManager.js");

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) throw new Error("Email is required!");
    const getUser = await usersModel.findOne({ email });

    if (!getUser)
      throw new Error("Email not found. Please Enter a valid email");

    const resetCode = Math.floor(10000 + Math.random() * 90000);

    await usersModel.updateOne(
      {
        email: email,
      },
      { reset_code: resetCode },
      {
        runValidators: true,
      }
    );

    await emailManager(
      email,
      "Your Password reset code is " + resetCode,
      "Forgot your password"
    );

    res.status(200).json({
      status: "success",
      message: "Reset code sent to email successfully.",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = forgotPassword;
