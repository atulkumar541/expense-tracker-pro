const transactionModel = require("../../../models/transaction.model.js");

const getTransactions = async (req, res) => {
  const transactions = await transactionModel.find({
    user_id: req.user._id,
    ...req.query,
  });

  res.status(200).json({
    status: "success",
    transactions,
  });
};

module.exports = getTransactions;
