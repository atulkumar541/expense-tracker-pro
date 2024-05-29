const express = require("express");
const auth = require("../../middleware/auth.js");
const addIncome = require("./controllers/addIncome.js");
const addExpense = require("./controllers/addExpense.js");
const getTransactions = require("./controllers/getTransaction.js");
const deleteTransaction = require("./controllers/deleteTransaction.js");
const editTransaction = require("./controllers/editTransaction.js");

const transactionRoute = express.Router();

//Routes..

transactionRoute.use(auth);

transactionRoute.post("/addincome", addIncome);
transactionRoute.post("/addexpense", addExpense);
transactionRoute.get("/", getTransactions);

transactionRoute.delete("/:transaction_Id", deleteTransaction);
transactionRoute.patch("/", editTransaction);

module.exports = transactionRoute;
