
import User from "../models/User.js";

// UPDATE USER CART : /api/cart/update
export const updateCart = async (req, res) => {

    try {

        const userId = req.userId;

        const { cartItems } = req.body;

        await User.findByIdAndUpdate(
            userId,
            { cartItems },
            { new: true }
        );

        res.json({
            success: true,
            message: "Cart Updated"
        });

    } catch (error) {

        console.log(error.message);

        res.json({
            success: false,
            message: error.message
        });

    }

};

// GET USER CART : /api/cart/get
export const getUserCart = async (req, res) => {

    try {

        const userId = req.userId;

        const user = await User.findById(userId);

        res.json({
            success: true,
            cartItems: user.cartItems
        });

    } catch (error) {

        console.log(error.message);

        res.json({
            success: false,
            message: error.message
        });

    }

};