const express = require("express");
const {
  getMyCart,
  updateMyCart,
  getMyProfile,
  updateMyProfile,
} = require("../controllers/userControllers");
const { authMiddleware } = require("../middlewares/authMiddlewares");
const userRouter = express.Router();

userRouter.get("/me/cart", authMiddleware, getMyCart);
userRouter.put("/me/cart", authMiddleware, updateMyCart);
userRouter.get("/me", authMiddleware, getMyProfile);
userRouter.put("/me", authMiddleware, updateMyProfile);

module.exports = userRouter;
