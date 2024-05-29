const express = require("express");
const register = require("./controllers/register.js");
const login = require("./controllers/login.js");
const dashboard = require("./controllers/userDashboard.js");
const auth = require("../../middleware/auth.js");
const forgotPassword = require("./controllers/forgotPassword.js");
const resetPassword = require("./controllers/resetPassword.js");

const userRoute = express.Router();

//Routes..
userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.post("/forgot-password", forgotPassword);
userRoute.post("/reset-password", resetPassword);
userRoute.use(auth);

userRoute.get("/dashboard", dashboard);

module.exports = userRoute;
