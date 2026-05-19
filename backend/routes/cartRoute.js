import express from "express";
import authUser from "../middlewares/authUser.js";

import {
    updateCart,
    getUserCart
} from "../controllers/cartController.js";

const cartRouter = express.Router();

// Update Cart
cartRouter.post('/update', authUser, updateCart);

// Get User Cart
cartRouter.get('/get', authUser, getUserCart);

export default cartRouter;