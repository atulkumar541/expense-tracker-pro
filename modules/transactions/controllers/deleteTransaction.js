const transactionModel = require("../../../models/transaction.model.js");
const validator = require("validator");
const usersModel = require("../../../models/user.model.js");

const deleteTransaction = async (req, res) => {
  try {
    const { transaction_Id } = req.params;

    if (!validator.isMongoId(transaction_Id.toString()))
      throw new Error("Please provide valid Transaction id!");

    const getTransaction = await transactionModel.findOne({
      _id: transaction_Id,
    });

    if (!getTransaction) throw new Error("Transaction Not Found!");

    if (getTransaction.transaction_type === "income") {
      //income logic
      await usersModel.updateOne(
        {
          _id: getTransaction.user_id,
        },
        {
          $inc: {
            balance: getTransaction.amount * -1,
          },
        },
        { runValidators: true }
      );
    } else {
      // expense logic
      await usersModel.updateOne(
        {
          _id: getTransaction.user_id,
        },
        {
          $inc: {
            balance: getTransaction.amount,
          },
        },
        { runValidators: true }
      );
    }
    console.log(getTransaction);

    const deleteTransction = await transactionModel.deleteOne({
      _id: transaction_Id,
    });

    res.status(200).json({
      status: "success",
      message: "Transaction deleted successfully.",
      deleteTransction,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
module.exports = deleteTransaction;
