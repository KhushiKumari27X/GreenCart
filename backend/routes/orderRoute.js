// import express from 'express';
// import authUser from '../middlewares/authUser.js';
// import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderStripe} from '../controllers/orderController.js';
// import authSeller from '../middlewares/authSeller.js';

// const orderRouter = express.Router();

// orderRouter.post('/cod', authUser, placeOrderCOD);
// orderRouter.get('/user', authUser, getUserOrders);
// orderRouter.get('/seller', authSeller, getAllOrders);
// orderRouter.post('/stripe', authUser, placeOrderStripe);

// export default orderRouter;

import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// PLACE ORDER : CASH ON DELIVERY
export const placeOrderCOD = async (req, res) => {

  try {

    // USER ID FROM AUTH MIDDLEWARE
    const userId = req.userId;

    // DATA FROM FRONTEND
    const { items, address } = req.body;

    // VALIDATION
    if (!items || items.length === 0) {

      return res.json({
        success: false,
        message: "Cart is Empty",
      });

    }

    // CALCULATE TOTAL AMOUNT
    let amount = 0;

    for (const item of items) {

      const product = await Product.findById(item.product);

      if (product) {

        amount += product.offerPrice * item.quantity;

      }

    }

    // ADD TAX
    amount += Math.floor(amount * 0.02);

    // CREATE ORDER
    const newOrder = await Order.create({
      userId,
      items,
      address,
      amount,
      paymentType: "COD",
      isPaid: false,
    });

    // CLEAR USER CART
    await User.findByIdAndUpdate(userId, {
      cartItems: {},
    });

    // RESPONSE
    res.json({
      success: true,
      message: "Order Placed Successfully",
      order: newOrder,
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });

  }

};

// PLACE ORDER : STRIPE
export const placeOrderStripe = async (req, res) => {

  try {

    const userId = req.userId;

    const { items, address } = req.body;

    if (!items || items.length === 0) {

      return res.json({
        success: false,
        message: "Cart is Empty",
      });

    }

    let productData = [];

    let amount = 0;

    // CALCULATE AMOUNT
    for (const item of items) {

      const product = await Product.findById(item.product);

      if (product) {

        productData.push({
          name: product.name,
          price: product.offerPrice,
          quantity: item.quantity,
        });

        amount += product.offerPrice * item.quantity;

      }

    }

    // ADD TAX
    amount += Math.floor(amount * 0.02);

    // CREATE ORDER
    const newOrder = await Order.create({
      userId,
      items,
      address,
      amount,
      paymentType: "Stripe",
      isPaid: false,
    });

    // STRIPE LINE ITEMS
    const line_items = productData.map((item) => ({

      price_data: {
        currency: "inr",

        product_data: {
          name: item.name,
        },

        unit_amount: item.price * 100,
      },

      quantity: item.quantity,

    }));

    // CREATE STRIPE SESSION
    const session = await stripe.checkout.sessions.create({

      payment_method_types: ["card"],

      mode: "payment",

      line_items,

      success_url: `${process.env.FRONTEND_URL}/my-orders`,

      cancel_url: `${process.env.FRONTEND_URL}/cart`,

      metadata: {
        orderId: newOrder._id.toString(),
        userId,
      },

    });

    res.json({
      success: true,
      url: session.url,
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });

  }

};

// GET USER ORDERS
export const getUserOrders = async (req, res) => {

  try {

    const userId = req.userId;

    const orders = await Order.find({ userId })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });

  }

};

// GET ALL ORDERS : SELLER
export const getAllOrders = async (req, res) => {

  try {

    const orders = await Order.find({})
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });

  }

};

// STRIPE WEBHOOK
export const stripeWebhooks = async (req, res) => {

  const sig = req.headers["stripe-signature"];

  let event;

  try {

    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

  } catch (error) {

    console.log(error.message);

    return res.status(400).send(
      `Webhook Error: ${error.message}`
    );

  }

  // PAYMENT SUCCESS
  if (event.type === "checkout.session.completed") {

    const session = event.data.object;

    const orderId = session.metadata.orderId;

    const userId = session.metadata.userId;

    // UPDATE ORDER
    await Order.findByIdAndUpdate(orderId, {
      isPaid: true,
    });

    // CLEAR USER CART
    await User.findByIdAndUpdate(userId, {
      cartItems: {},
    });

  }

  res.json({
    received: true,
  });

};