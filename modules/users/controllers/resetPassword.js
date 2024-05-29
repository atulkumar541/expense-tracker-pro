const usersModel = require("../../../models/user.model.js");
const emailManager = require("../../../managers/emailManager.js");

const bcrypt = require("bcrypt");

const resetPassword = async (req, res) => {
  try {
    const { email, new_password, reset_code } = req.body;

    if (!email) throw new Error("Email is required!");
    if (!new_password) throw new Error("New password is required!");
    if (!reset_code) throw new Error("Reset Code is required!");

    if (new_password.length < 5)
      throw new Error("Password must be atleast 5 charachters long!");

    const getUserWithResetCode = await usersModel.findOne({
      email: email,
      reset_code: reset_code,
    });

    if (!getUserWithResetCode) throw new Error("Reset code does not match!");

    const hashedPassword = await bcrypt.hash(new_password, 12);

    await usersModel.updateOne(
      {
        email: email,
      },
      {
        password: hashedPassword,
        reset_code: "",
      },
      { runValidators: true }
    );

    await emailManager(
      email,
      "Password reset successfully. If this not you then please forgot your password!",
      "Reset password"
    );

    res.status(200).json({
      status: "success",
      message: "Password reset successfully.",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = resetPassword;
