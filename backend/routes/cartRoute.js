import express from 'express';
import authUser from '../middlewares/authUser.js';
import authSeller from '../middlewares/authSeller.js';

import {
  getAllOrders,
  getUserOrders,
  placeOrderCOD,
  placeOrderStripe
} from '../controllers/orderController.js';

const orderRouter = express.Router();

// COD Order
orderRouter.post('/cod', authUser, placeOrderCOD);

// Stripe Order
orderRouter.post('/stripe', authUser, placeOrderStripe);

// User Orders
orderRouter.get('/user', authUser, getUserOrders);

// Seller Orders
orderRouter.get('/seller', authSeller, getAllOrders);

export default orderRouter;


