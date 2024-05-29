const transactionModel = require("../../../models/transaction.model.js");
const usersModel = require("../../../models/user.model.js");
const validator = require("validator");
const addIncome = async (req, res) => {
  const { amount, remarks } = req.body;

  if (!amount) throw new Error("Amount is required");

  if (!validator.isNumeric(amount.toString()))
    throw new Error("Amount must be a valid number");

  if (amount < 0) throw new Error("Amount must be gereter than 0");

  if (!remarks) throw new Error("Remarks is required");

  if (remarks.length < 5)
    throw new Error("Remark must be atleast 5 characters long");

  const incomeData = await transactionModel.create({
    user_id: req.user._id,
    amount: amount,
    remarks: remarks,
    transaction_type: "income",
  });
  if (incomeData) {
    await usersModel.updateOne(
      {
        _id: req.user._id,
      },
      {
        $inc: {
          balance: amount,
        },
      },
      {
        runValidators: true,
      }
    );
  }
  res.status(200).json({
    status: "success",
    message: "Income added successfully.",
    incomeData,
  });
};

module.exports = addIncome;
