const express = require("express");
const {getMyCart,updateMyCart} = require("../controllers/userControllers");
const userRouter = express.Router();

userRouter.get("/me/cart",getMyCart);
userRouter.put("/me/cart",updateMyCart);

module.exports = userRouter;
