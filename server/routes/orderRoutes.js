const express = require("express");
const {authMiddleware,isAdmin} = require("../middlewares/authMiddlewares");
const {
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus
} = require("../controllers/orderControllers");

const orderRouter = express.Router();

// for both auth and guest:
orderRouter.post('/',createOrder);

// for auth users only:
orderRouter.get('/me',authMiddleware,getMyOrders);

// for admin only
orderRouter.get("/",authMiddleware,isAdmin,getAllOrders);
// update status by admin:
orderRouter.patch("/:id",authMiddleware,isAdmin,updateOrderStatus);

module.exports = orderRouter;
