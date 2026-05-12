// import mongoose, { isObjectIdOrHexString } from "mongoose";

// const productSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     description: { type: Array, required: true },
//     price: { type: Number, required: true },
//     offerPrice: { type: Number, required: true },
//     image: { type: Array, required: true },
//     category: { type: String, required: true },
//     inStock: { type: Boolean, default: true },
// }, { timestamps: true });

// const Product = mongoose.models.product || mongoose.model('product', productSchema);

// export default Product;

// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//     name: { 
//         type: String, 
//         required: true 
//     },

//     description: { 
//         type: String, 
//         required: true 
//     },

//     quantity: {
//         type: String,
//         required: true
//     },

//     price: { 
//         type: Number, 
//         required: true 
//     },

//     offerPrice: { 
//         type: Number, 
//         required: true 
//     },

//     image: { 
//         type: Array, 
//         required: true 
//     },

//     category: { 
//         type: String, 
//         required: true 
//     },

//     inStock: { 
//         type: Boolean, 
//         default: true 
//     },

// }, { timestamps: true });

// const Product =
//     mongoose.models.product ||
//     mongoose.model("product", productSchema);

// export default Product;


import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    quantity: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    offerPrice: {
        type: Number,
        required: true
    },

    rating: {
        type: Number,
        default: 4
    },

    reviews: {
        type: Number,
        default: 1
    },

    image: {
        type: Array,
        required: true
    },

    inStock: {
        type: Boolean,
        default: true
    },

}, { timestamps: true });

const Product =
    mongoose.models.product ||
    mongoose.model("product", productSchema);

export default Product;