import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    name: {
      type: String,
    },

    rating: {
      type: Number,
      required: true,
    },

    comment: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    quantity: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    offerPrice: {
      type: Number,
      required: true,
    },

    // Dynamic Average Rating
    rating: {
      type: Number,
      default: 0,
    },

    // Total Reviews Count
    numReviews: {
      type: Number,
      default: 0,
    },

    // Reviews Array
    reviews: [reviewSchema],

    image: {
      type: Array,
      required: true,
    },

    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.product ||
  mongoose.model("product", productSchema);

export default Product;