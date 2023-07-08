const express = require("express");
const app = express.Router();

app.use("/api/user/signup",require("../controllers/SignupController"));
app.use("/api/user/auth",require("../controllers/authController"));
app.use("/api/city",require("../controllers/cityController"));
app.use("/api/user/profile",require("../controllers/profileController"));
app.use("/api/category",require("../controllers/categoryController"));
app.use("/api/product",require("../controllers/productController"));
app.use("/api/admin/login",require("../controllers/admincontroller"));
app.use("/api/coupon",require("../controllers/couponControlller"));
app.use("/api/cart",require("../controllers/cartController"));

module.exports = app;   