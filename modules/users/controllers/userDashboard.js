const usersModel = require("../../../models/user.model.js");
const transactionModel = require("../../../models/transaction.model.js");

const dashboard = async (req, res) => {
  const getUser = await usersModel
    .findOne({ _id: req.user._id })
    .select("-password");

  const transactions = await transactionModel
    .find({
      user_id: req.user._id,
    })
    .sort("-createdAt")
    .limit(5);

  res.status(200).json({
    status: "success",
    message: "Welcome to dashboard.",
    data: getUser,
    transactions,
  });
};

module.exports = dashboard;
