const mongoose = require("mongoose");
require("dotenv").config();

//Mongoose connection
mongoose.connect(
  "mongodb+srv://chaturvediatulkumar541:Atulkumar@0541#@expense-tracker-pro.xuhmzlp.mongodb.net/?retryWrites=true&w=majority&appName=expense-tracker-pro"
);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("connected to Local database!");
});
db.on("error", (err) => {
  console.log("Error in database:", err);
});
db.on("disconnected", () => {
  console.log("Database Disconnected!");
});

module.exports = db;
