import express from 'express';

import authUser from '../middlewares/authUser.js';

import authSeller from '../middlewares/authSeller.js';

import {
  getAllOrders,
  getUserOrders,
  placeOrderCOD,
  placeOrderStripe,
  updateOrderStatus,
} from '../controllers/orderController.js';

const orderRouter = express.Router();

// Place COD Order
orderRouter.post(
  '/cod',
  authUser,
  placeOrderCOD
);

// Place Stripe Order
orderRouter.post(
  '/stripe',
  authUser,
  placeOrderStripe
);

// Get User Orders
orderRouter.get(
  '/user',
  authUser,
  getUserOrders
);

// Get Seller Orders
orderRouter.get(
  '/seller',
  authSeller,
  getAllOrders
);

// Update Order Status
orderRouter.post(
  '/status',
  authSeller,
  updateOrderStatus
);

export default orderRouter;