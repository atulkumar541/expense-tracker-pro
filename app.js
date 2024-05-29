const express = require("express");
const errorHandler = require("./handlers/errorHandler.js");
require("./config/db.js");
const userRoute = require("./modules/users/users.routes.js");
const transactionRoute = require("./modules/transactions/transactions.routes.js");

const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(express.json());
app.use(cors());

//model import
require("./models/user.model.js");
require("./models/transaction.model.js");

//start all routes
app.use("/api/users", userRoute);
app.use("/api/transcation", transactionRoute);
//End of all routes

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "failed",
    message: "SORRY! we couldn't find that page",
  });
}); // 404 error will come if any routes hits

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("Server started successfully");
});
