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
const getMyProfile = async (req,res) => {
    const { id } = req.user;
    try{
        const userProfile = await User.findById(id).select('-password');
        return res.status(200).json({
            message:"Profile retrieved successfully",
            data: userProfile
        })
    } catch (err) {
        console.error("Error getting:", err);
        res.status(500).json({ message: "Server error while retrieving user.", error: err.message });
    }
}
const updateMyProfile = async (req, res) => {
    try {
        const { id } = req.user;
        const allowedUpdates = ['name', 'phone', 'savedAddresses'];

        const updateData = {};

        for (const key of allowedUpdates) {
            if (req.body[key]) {
                updateData[key] = req.body[key];
            }
        }
        
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "No valid fields provided for update." });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({
            message: "Profile updated successfully",
            data: updatedUser
        });

    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).json({ message: "Server error while updating user.", error: err.message });
    }
}

module.exports = {
    getMyCart,
    updateMyCart,
    getMyProfile,
  updateMyProfile
};