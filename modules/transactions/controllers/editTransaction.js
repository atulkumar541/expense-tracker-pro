const transactionModel = require("../../../models/transaction.model.js");
const validator = require("validator");

const editTransaction = async (req, res) => {
  try {
    const { transactionId, remarks } = req.body;
    if (!transactionId) throw new Error("Transaction id is required!");

    if (!validator.isMongoId(transactionId.toString()))
      throw new Error("Please provide valid Transaction id!");

    const getTransaction = await transactionModel.findOne({
      _id: transactionId,
    });

    if (!getTransaction) throw new Error("Transaction Not Found!");

    const editedTransactions = await transactionModel.updateOne(
      {
        _id: transactionId,
      },
      { remarks },
      { runValidators: true }
    );

    res.status(200).json({
      status: "Success",
      message: "Transaction Edited Successfully",
      editedTransactions,
    });
  } catch (error) {
    res.status(401).json(error.message);
  }
};
module.exports = editTransaction;
// I have to implement the this edit transaction code to user can also edit the amount and transaction type
/*
usecase:

while changeing transation type
1) if income ? add amount in balance : as it is
2) if expense ? deduct amount from balance :  as it is

while changeing only amount
check transaction
1) if income ? add amount in balance : as it is
2) if expense ? deduct amount from balance :  as it is
*/
