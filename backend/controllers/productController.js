import { v2 as cloudinary } from "cloudinary";
import Product from "../models/Product.js";

// ADD PRODUCT
export const addProduct = async (req, res) => {

  try {

    const productData = JSON.parse(
      req.body.productData
    );

    const {
      name,
      description,
      quantity,
      category,
      price,
      offerPrice,
    } = productData;

    // IMAGES
    const images = req.files || [];

    const imagesUrl = await Promise.all(

      images.map(async (item) => {

        const result =
          await cloudinary.uploader.upload(
            item.path,
            {
              resource_type: "image",
            }
          );

        return result.secure_url;

      })

    );

    // CREATE PRODUCT
    const newProduct =
      await Product.create({

        name,
        description,
        quantity,
        category,
        price,
        offerPrice,

        image: imagesUrl,

        inStock: true,

        // REVIEW DEFAULTS
        rating: 0,
        numReviews: 0,
        reviews: [],

      });

    res.json({
      success: true,
      message: "Product Added",
      product: newProduct,
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });

  }

};

// PRODUCT LIST
export const productList = async (req, res) => {

  try {

    const products =
      await Product.find({});

    res.json({
      success: true,
      products,
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });

  }

};

// SINGLE PRODUCT
export const productById = async (req, res) => {

  try {

    const { id } = req.params;

    const product =
      await Product.findById(id);

    res.json({
      success: true,
      product,
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });

  }

};

// CHANGE STOCK
export const changeStock = async (req, res) => {

  try {

    const {
      id,
      inStock,
    } = req.body;

    await Product.findByIdAndUpdate(
      id,
      { inStock }
    );

    res.json({
      success: true,
      message: "Stock Updated",
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });

  }

};

// ADD REVIEW
export const addReview = async (req, res) => {

  try {

    // PRODUCT ID FROM PARAMS
    const { id } = req.params;

    // REVIEW DATA
    const {
      rating,
      comment,
    } = req.body;

    // FIND PRODUCT
    const product =
      await Product.findById(id);

    // CHECK PRODUCT
    if (!product) {

      return res.json({
        success: false,
        message: "Product not found",
      });

    }

    // CHECK ALREADY REVIEWED
    const alreadyReviewed =
      product.reviews.find(

        (item) =>
          item.userId.toString() ===
          req.userId.toString()

      );

    if (alreadyReviewed) {

      return res.json({
        success: false,
        message:
          "You already reviewed this product",
      });

    }

    // CREATE REVIEW
    const review = {

      userId: req.userId,

      name: "Customer",

      rating: Number(rating),

      comment,

    };

    // PUSH REVIEW
    product.reviews.push(review);

    // UPDATE REVIEW COUNT
    product.numReviews =
      product.reviews.length;

    // UPDATE AVERAGE RATING
    product.rating =

      product.reviews.reduce(

        (acc, item) =>
          acc + item.rating,

        0

      ) / product.reviews.length;

    // SAVE PRODUCT
    await product.save();

    res.json({
      success: true,
      message:
        "Review Added Successfully",
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });

  }

};

// GET ALL REVIEWS
export const getAllReviews = async (req, res) => {

  try {

    const products =
      await Product.find({});

    let allReviews = [];

    products.forEach((product) => {

      if (
        product.reviews.length > 0
      ) {

        const reviews =
          product.reviews.map(
            (review) => ({

              ...review._doc,

              productName:
                product.name,

              productImage:
                product.image[0],

            })
          );

        allReviews.push(...reviews);

      }

    });

    res.json({
      success: true,
      reviews:
        allReviews.reverse(),
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });

  }

};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {

  try {

    const { id } = req.params;

    await Product.findByIdAndDelete(
      id
    );

    res.json({
      success: true,
      message:
        "Product Deleted Successfully",
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });

  }

};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {

  try {

    const { id } = req.params;

    const {

      name,
      description,
      quantity,
      category,
      price,
      offerPrice,

    } = req.body;

    await Product.findByIdAndUpdate(

      id,

      {

        name,
        description,
        quantity,
        category,
        price,
        offerPrice,

      }

    );

    res.json({
      success: true,
      message:
        "Product Updated Successfully",
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });

  }

};