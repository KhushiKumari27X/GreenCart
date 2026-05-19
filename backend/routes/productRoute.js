import express from "express";

import { upload } from "../configs/multer.js";

import authSeller from "../middlewares/authSeller.js";

import authUser from "../middlewares/authUser.js";

import {
  addProduct,
  changeStock,
  productById,
  productList,
  addReview,
  getAllReviews,
  deleteProduct,
  updateProduct,
} from "../controllers/productController.js";

const productRouter = express.Router();

// Add Product
productRouter.post(
  "/add",
  upload.array("images"),
  authSeller,
  addProduct
);

// Product List
productRouter.get(
  "/list",
  productList
);

// Get All Reviews For Seller Dashboard
productRouter.get(
  "/reviews",
  authSeller,
  getAllReviews
);

// Single Product
productRouter.get(
  "/:id",
  productById
);

// Change Stock
productRouter.post(
  "/stock",
  authSeller,
  changeStock
);

// Add Review
productRouter.post(
  "/review/:id",
  authUser,
  addReview
);

// Delete Product
productRouter.delete(
  "/delete/:id",
  authSeller,
  deleteProduct
);

// Update Product
productRouter.put(
  "/update/:id",
  authSeller,
  updateProduct
);

export default productRouter;