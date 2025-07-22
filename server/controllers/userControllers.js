const User = require("../models/User");

const getMyCart = async (req, res) => {
    try {
        const { id } = req.user;

        const user = await User.findById(id).populate({
            path: 'cart.productId',
            model: 'Product'
        }).select('cart'); 

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({
            message: "Cart retrieved successfully",
            data: user.cart 
        });

    } catch (err) {
        console.error("Error getting cart:", err);
        res.status(500).json({ message: "Server error while retrieving cart.", error: err.message });
    }
};

const updateMyCart = async (req, res) => {
    try {
        const { id } = req.user;
        const { cart } = req.body;

        if (!Array.isArray(cart)) {
            return res.status(400).json({ message: "Bad Request. Cart data must be an array." });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: { cart: cart } },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({
            message: "Cart updated successfully",
            data: updatedUser.cart
        });

    } catch (err) {
        console.error("Error updating cart:", err);
        res.status(500).json({ message: "Server error while updating cart.", error: err.message });
    }
};

module.exports = {
    getMyCart,
    updateMyCart
};