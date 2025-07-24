const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

const createOrder = async (req, res) => {
  const { customerDetails, products } = req.body;

  if (!customerDetails || !customerDetails.email || !customerDetails.shippingAddress || !products || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: "Bad Request: Missing required fields or empty products list." });
  }

  try {
    
    let totalAmount = 0;
    const productDetails = [];

    for (const item of products) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.productId} not found.` });
      }
      if (product.stock < item.quantity) {
        return res.status(409).json({ message: `Not enough stock for ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}.` });
      }

      totalAmount += product.price * item.quantity;
      productDetails.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      });
    }

    const user = await User.findOne({ email: customerDetails.email });

    const newOrder = new Order({
      user: user ? user._id : null,
      customerEmail: customerDetails.email,
      shippingAddress: customerDetails.shippingAddress,
      products: productDetails,
      totalAmount: totalAmount,
    });

    const savedOrder = await newOrder.save();

    for (const item of savedOrder.products) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity }
      });
    }

    if (user) {
      await User.findByIdAndUpdate(user._id, { $set: { cart: [] } });
    }
    
    return res.status(201).json({
      message: "Order placed successfully",
      data: savedOrder,
    });

  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ message: "Server error during order creation.", error: err.message });
  }
};

const getMyOrders = async (req, res) => {
    try {
        const { id } = req.user;

        const orders = await Order.find({ user: id }).sort({ createdAt: -1 });

        res.status(200).json({
            message: "User orders retrieved successfully",
            data: orders
        });
    } catch (err) {
        console.error("Error getting user's orders:", err);
        res.status(500).json({ message: "Server error while retrieving orders.", error: err.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });

        res.status(200).json({
            message: "All orders retrieved successfully",
            data: orders
        });
    } catch (err) {
        console.error("Error getting all orders:", err);
        res.status(500).json({ message: "Server error while retrieving orders.", error: err.message });
    }
};

const updateOrderStatus = async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;

    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { $set: { status: status } },
            { new: true, runValidators: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found." });
        }

        return res.status(200).json({
            message: "Order status updated successfully",
            data: updatedOrder
        });

    } catch (err) {
        console.error("Error updating status:", err);
        res.status(500).json({ message: "Server error while updating status.", error: err.message });
    }
};

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
};
