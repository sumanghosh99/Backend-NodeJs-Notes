const express = require("express");
const app = express();

//const User=require("./modules/usermodule");
const userController=require("./controller/productController");
app.use(express.json());
app.use("/products",userController);
module.exports = app;