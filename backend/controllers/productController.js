
// // import { v2 as cloudinary } from "cloudinary";
// // import Product from "../models/Product.js";

// // // Add Product : /api/product/add
// // export const addProduct = async (req, res) => {

// //   try {

// //     const productData = JSON.parse(req.body.productData);

// //     const {
// //       name,
// //       description,
// //       quantity,
// //       category,
// //       price,
// //       offerPrice,
// //       rating,
// //       reviews
// //     } = productData;

// //     const images = req.files || [];

// //     const imagesUrl = await Promise.all(
// //       images.map(async (item) => {

// //         const result = await cloudinary.uploader.upload(item.path, {
// //           resource_type: "image",
// //         });

// //         return result.secure_url;

// //       })
// //     );

// //     const newProduct = await Product.create({
// //       name,
// //       description,
// //       quantity,
// //       category,
// //       price,
// //       offerPrice,
// //       rating,
// //       reviews,
// //       image: imagesUrl,
// //       inStock: true,
// //     });

// //     res.json({
// //       success: true,
// //       message: "Product Added",
// //       product: newProduct,
// //     });

// //   } catch (error) {

// //     console.log(error);

// //     res.json({
// //       success: false,
// //       message: error.message,
// //     });

// //   }
// // };

// // // Get Product List : /api/product/list
// // export const productList = async (req, res) => {

// //   try {

// //     const products = await Product.find({});

// //     res.json({
// //       success: true,
// //       products,
// //     });

// //   } catch (error) {

// //     console.log(error);

// //     res.json({
// //       success: false,
// //       message: error.message,
// //     });

// //   }
// // };

// // // Get Single Product : /api/product/:id
// // export const productById = async (req, res) => {

// //   try {

// //     const { id } = req.params;

// //     const product = await Product.findById(id);

// //     res.json({
// //       success: true,
// //       product,
// //     });

// //   } catch (error) {

// //     console.log(error);

// //     res.json({
// //       success: false,
// //       message: error.message,
// //     });

// //   }
// // };

// // // Change Product Stock : /api/product/stock
// // export const changeStock = async (req, res) => {

// //   try {

// //     const { id, inStock } = req.body;

// //     await Product.findByIdAndUpdate(id, { inStock });

// //     res.json({
// //       success: true,
// //       message: "Stock Updated",
// //     });

// //   } catch (error) {

// //     console.log(error);

// //     res.json({
// //       success: false,
// //       message: error.message,
// //     });

// //   }
// // };

// import { v2 as cloudinary } from "cloudinary";
// import Product from "../models/Product.js";

// // Add Product : /api/product/add
// export const addProduct = async (req, res) => {

//   try {

//     const productData = JSON.parse(req.body.productData);

//     const {
//       name,
//       description,
//       quantity,
//       category,
//       price,
//       offerPrice,
//     } = productData;

//     const images = req.files || [];

//     const imagesUrl = await Promise.all(
//       images.map(async (item) => {

//         const result = await cloudinary.uploader.upload(
//           item.path,
//           {
//             resource_type: "image",
//           }
//         );

//         return result.secure_url;

//       })
//     );

//     const newProduct = await Product.create({
//       name,
//       description,
//       quantity,
//       category,
//       price,
//       offerPrice,
//       image: imagesUrl,
//       inStock: true,

//       // Default Dynamic Values
//       rating: 0,
//       numReviews: 0,
//       reviews: [],
//     });

//     res.json({
//       success: true,
//       message: "Product Added",
//       product: newProduct,
//     });

//   } catch (error) {

//     console.log(error);

//     res.json({
//       success: false,
//       message: error.message,
//     });

//   }
// };

// // Get Product List : /api/product/list
// export const productList = async (req, res) => {

//   try {

//     const products = await Product.find({});

//     res.json({
//       success: true,
//       products,
//     });

//   } catch (error) {

//     console.log(error);

//     res.json({
//       success: false,
//       message: error.message,
//     });

//   }
// };

// // Get Single Product : /api/product/:id
// export const productById = async (req, res) => {

//   try {

//     const { id } = req.params;

//     const product = await Product.findById(id);

//     res.json({
//       success: true,
//       product,
//     });

//   } catch (error) {

//     console.log(error);

//     res.json({
//       success: false,
//       message: error.message,
//     });

//   }
// };

// // Change Product Stock : /api/product/stock
// export const changeStock = async (req, res) => {

//   try {

//     const { id, inStock } = req.body;

//     await Product.findByIdAndUpdate(id, {
//       inStock,
//     });

//     res.json({
//       success: true,
//       message: "Stock Updated",
//     });

//   } catch (error) {

//     console.log(error);

//     res.json({
//       success: false,
//       message: error.message,
//     });

//   }
// };

// // Add Review : /api/product/review
// export const addReview = async (req, res) => {

//   try {

//     const {
//       productId,
//       rating,
//       comment,
//     } = req.body;

//     const product = await Product.findById(productId);

//     if (!product) {

//       return res.json({
//         success: false,
//         message: "Product not found",
//       });

//     }

//     // Check if already reviewed
//     const alreadyReviewed = product.reviews.find(
//       (item) =>
//         item.userId.toString() ===
//         req.user._id.toString()
//     );

//     if (alreadyReviewed) {

//       return res.json({
//         success: false,
//         message: "You already reviewed this product",
//       });

//     }

//     // Create Review
//     const review = {
//       userId: req.user._id,
//       name: req.user.name,
//       rating: Number(rating),
//       comment,
//     };

//     // Push Review
//     product.reviews.push(review);

//     // Update Total Reviews
//     product.numReviews =
//       product.reviews.length;

//     // Calculate Average Rating
//     product.rating =
//       product.reviews.reduce(
//         (acc, item) => acc + item.rating,
//         0
//       ) / product.reviews.length;

//     await product.save();

//     res.json({
//       success: true,
//       message: "Review Added Successfully",
//     });

//   } catch (error) {

//     console.log(error);

//     res.json({
//       success: false,
//       message: error.message,
//     });

//   }
// };

// import { v2 as cloudinary } from "cloudinary";
// import Product from "../models/Product.js";

// // Add Product : /api/product/add
// export const addProduct = async (req, res) => {

//   try {

//     const productData = JSON.parse(req.body.productData);

//     const {
//       name,
//       description,
//       quantity,
//       category,
//       price,
//       offerPrice,
//     } = productData;

//     const images = req.files || [];

//     const imagesUrl = await Promise.all(
//       images.map(async (item) => {

//         const result = await cloudinary.uploader.upload(
//           item.path,
//           {
//             resource_type: "image",
//           }
//         );

//         return result.secure_url;

//       })
//     );

//     const newProduct = await Product.create({
//       name,
//       description,
//       quantity,
//       category,
//       price,
//       offerPrice,
//       image: imagesUrl,
//       inStock: true,

//       // Review Defaults
//       rating: 0,
//       numReviews: 0,
//       reviews: [],
//     });

//     res.json({
//       success: true,
//       message: "Product Added",
//       product: newProduct,
//     });

//   } catch (error) {

//     console.log(error);

//     res.json({
//       success: false,
//       message: error.message,
//     });

//   }

// };

// // Get Product List : /api/product/list
// export const productList = async (req, res) => {

//   try {

//     const products = await Product.find({});

//     res.json({
//       success: true,
//       products,
//     });

//   } catch (error) {

//     console.log(error);

//     res.json({
//       success: false,
//       message: error.message,
//     });

//   }

// };

// // Get Single Product : /api/product/:id
// export const productById = async (req, res) => {

//   try {

//     const { id } = req.params;

//     const product = await Product.findById(id);

//     res.json({
//       success: true,
//       product,
//     });

//   } catch (error) {

//     console.log(error);

//     res.json({
//       success: false,
//       message: error.message,
//     });

//   }

// };

// // Change Product Stock : /api/product/stock
// export const changeStock = async (req, res) => {

//   try {

//     const { id, inStock } = req.body;

//     await Product.findByIdAndUpdate(id, {
//       inStock,
//     });

//     res.json({
//       success: true,
//       message: "Stock Updated",
//     });

//   } catch (error) {

//     console.log(error);

//     res.json({
//       success: false,
//       message: error.message,
//     });

//   }

// };

// // Add Review : /api/product/review
// export const addReview = async (req, res) => {

//   try {

//     const {
//       productId,
//       rating,
//       comment,
//     } = req.body;

//     const product = await Product.findById(productId);

//     if (!product) {

//       return res.json({
//         success: false,
//         message: "Product not found",
//       });

//     }

//     // Check Already Reviewed
//     const alreadyReviewed = product.reviews.find(
//       (item) =>
//         item.userId.toString() ===
//         req.userId.toString()
//     );

//     if (alreadyReviewed) {

//       return res.json({
//         success: false,
//         message: "You already reviewed this product",
//       });

//     }

//     // Create Review
//     const review = {
//       userId: req.userId,
//       name: "Customer",
//       rating: Number(rating),
//       comment,
//     };

//     // Push Review
//     product.reviews.push(review);

//     // Total Reviews
//     product.numReviews = product.reviews.length;

//     // Average Rating
//     product.rating =
//       product.reviews.reduce(
//         (acc, item) => acc + item.rating,
//         0
//       ) / product.reviews.length;

//     await product.save();

//     res.json({
//       success: true,
//       message: "Review Added Successfully",
//     });

//   } catch (error) {

//     console.log(error);

//     res.json({
//       success: false,
//       message: error.message,
//     });

//   }

// };

// // Get All Reviews : /api/product/reviews
// export const getAllReviews = async (req, res) => {

//   try {

//     const products = await Product.find({});

//     let allReviews = [];

//     products.forEach((product) => {

//       if (product.reviews.length > 0) {

//         const reviews = product.reviews.map((review) => ({
//           ...review._doc,
//           productName: product.name,
//           productImage: product.image[0],
//         }));

//         allReviews.push(...reviews);

//       }

//     });

//     res.json({
//       success: true,
//       reviews: allReviews.reverse(),
//     });

//   } catch (error) {

//     console.log(error);

//     res.json({
//       success: false,
//       message: error.message,
//     });

//   }

// };


// import { v2 as cloudinary } from "cloudinary";
// import Product from "../models/Product.js";

// // Add Product : /api/product/add
// export const addProduct = async (req, res) => {

//   try {

//     const productData = JSON.parse(req.body.productData);

//     const {
//       name,
//       description,
//       quantity,
//       category,
//       price,
//       offerPrice,
//     } = productData;

//     const images = req.files || [];

//     const imagesUrl = await Promise.all(
//       images.map(async (item) => {

//         const result = await cloudinary.uploader.upload(
//           item.path,
//           {
//             resource_type: "image",
//           }
//         );

//         return result.secure_url;

//       })
//     );

//     const newProduct = await Product.create({
//       name,
//       description,
//       quantity,
//       category,
//       price,
//       offerPrice,
//       image: imagesUrl,
//       inStock: true,

//       // Review Defaults
//       rating: 0,
//       numReviews: 0,
//       reviews: [],
//     });

//     res.json({
//       success: true,
//       message: "Product Added",
//       product: newProduct,
//     });

//   } catch (error) {

//     console.log(error);

//     res.json({
//       success: false,
//       message: error.message,
//     });

//   }

// };

// // Get Product List : /api/product/list
// export const productList = async (req, res) => {

//   try {

//     const products = await Product.find({});

//     res.json({
//       success: true,
//       products,
//     });

//   } catch (error) {

//     console.log(error);

//     res.json({
//       success: false,
//       message: error.message,
//     });

//   }

// };

// // Get Single Product : /api/product/:id
// export const productById = async (req, res) => {

//   try {

//     const { id } = req.params;

//     const product = await Product.findById(id);

//     res.json({
//       success: true,
//       product,
//     });

//   } catch (error) {

//     console.log(error);

//     res.json({
//       success: false,
//       message: error.message,
//     });

//   }

// };

// // Change Product Stock : /api/product/stock
// export const changeStock = async (req, res) => {

//   try {

//     const { id, inStock } = req.body;

//     await Product.findByIdAndUpdate(id, {
//       inStock,
//     });

//     res.json({
//       success: true,
//       message: "Stock Updated",
//     });

//   } catch (error) {

//     console.log(error);

//     res.json({
//       success: false,
//       message: error.message,
//     });

//   }

// };

// // Add Review : /api/product/review
// export const addReview = async (req, res) => {

//   try {

//     const {
//       productId,
//       rating,
//       comment,
//     } = req.body;

//     const product = await Product.findById(productId);

//     if (!product) {

//       return res.json({
//         success: false,
//         message: "Product not found",
//       });

//     }

//     // Check Already Reviewed
//     const alreadyReviewed = product.reviews.find(
//       (item) =>
//         item.userId.toString() ===
//         req.userId.toString()
//     );

//     if (alreadyReviewed) {

//       return res.json({
//         success: false,
//         message: "You already reviewed this product",
//       });

//     }

//     // Create Review
//     const review = {
//       userId: req.userId,
//       name: "Customer",
//       rating: Number(rating),
//       comment,
//     };

//     // Push Review
//     product.reviews.push(review);

//     // Total Reviews
//     product.numReviews = product.reviews.length;

//     // Average Rating
//     product.rating =
//       product.reviews.reduce(
//         (acc, item) => acc + item.rating,
//         0
//       ) / product.reviews.length;

//     await product.save();

//     res.json({
//       success: true,
//       message: "Review Added Successfully",
//     });

//   } catch (error) {

//     console.log(error);

//     res.json({
//       success: false,
//       message: error.message,
//     });

//   }

// };

// // Get All Reviews : /api/product/reviews
// export const getAllReviews = async (req, res) => {

//   try {

//     const products = await Product.find({});

//     let allReviews = [];

//     products.forEach((product) => {

//       if (product.reviews.length > 0) {

//         const reviews = product.reviews.map((review) => ({
//           ...review._doc,
//           productName: product.name,
//           productImage: product.image[0],
//         }));

//         allReviews.push(...reviews);

//       }

//     });

//     res.json({
//       success: true,
//       reviews: allReviews.reverse(),
//     });

//   } catch (error) {

//     console.log(error);

//     res.json({
//       success: false,
//       message: error.message,
//     });

//   }

// };

// // Delete Product : /api/product/delete/:id
// export const deleteProduct = async (req, res) => {

//   try {

//     const { id } = req.params;

//     await Product.findByIdAndDelete(id);

//     res.json({
//       success: true,
//       message: "Product Deleted Successfully",
//     });

//   } catch (error) {

//     console.log(error);

//     res.json({
//       success: false,
//       message: error.message,
//     });

//   }

// };

// import { v2 as cloudinary } from "cloudinary";
// import Product from "../models/Product.js";

// // Add Product : /api/product/add
// export const addProduct = async (req, res) => {

//   try {

//     const productData = JSON.parse(req.body.productData);

//     const {
//       name,
//       description,
//       quantity,
//       category,
//       price,
//       offerPrice,
//     } = productData;

//     const images = req.files || [];

//     const imagesUrl = await Promise.all(
//       images.map(async (item) => {

//         const result = await cloudinary.uploader.upload(
//           item.path,
//           {
//             resource_type: "image",
//           }
//         );

//         return result.secure_url;

//       })
//     );

//     const newProduct = await Product.create({
//       name,
//       description,
//       quantity,
//       category,
//       price,
//       offerPrice,
//       image: imagesUrl,
//       inStock: true,

//       rating: 0,
//       numReviews: 0,
//       reviews: [],
//     });

//     res.json({
//       success: true,
//       message: "Product Added",
//       product: newProduct,
//     });

//   } catch (error) {

//     console.log(error);

//     res.json({
//       success: false,
//       message: error.message,
//     });

//   }

// };

// // Get Product List
// export const productList = async (req, res) => {

//   try {

//     const products = await Product.find({});

//     res.json({
//       success: true,
//       products,
//     });

//   } catch (error) {

//     console.log(error);

//     res.json({
//       success: false,
//       message: error.message,
//     });

//   }

// };

// // Get Single Product
// export const productById = async (req, res) => {

//   try {

//     const { id } = req.params;

//     const product = await Product.findById(id);

//     res.json({
//       success: true,
//       product,
//     });

//   } catch (error) {

//     console.log(error);

//     res.json({
//       success: false,
//       message: error.message,
//     });

//   }

// };

// // Change Product Stock
// export const changeStock = async (req, res) => {

//   try {

//     const { id, inStock } = req.body;

//     await Product.findByIdAndUpdate(id, {
//       inStock,
//     });

//     res.json({
//       success: true,
//       message: "Stock Updated",
//     });

//   } catch (error) {

//     console.log(error);

//     res.json({
//       success: false,
//       message: error.message,
//     });

//   }

// };

// // Add Review
// export const addReview = async (req, res) => {

//   try {

//     const {
//       productId,
//       rating,
//       comment,
//     } = req.body;

//     const product = await Product.findById(productId);

//     if (!product) {

//       return res.json({
//         success: false,
//         message: "Product not found",
//       });

//     }

//     const alreadyReviewed = product.reviews.find(
//       (item) =>
//         item.userId.toString() ===
//         req.userId.toString()
//     );

//     if (alreadyReviewed) {

//       return res.json({
//         success: false,
//         message: "You already reviewed this product",
//       });

//     }

//     const review = {
//       userId: req.userId,
//       name: "Customer",
//       rating: Number(rating),
//       comment,
//     };

//     product.reviews.push(review);

//     product.numReviews = product.reviews.length;

//     product.rating =
//       product.reviews.reduce(
//         (acc, item) => acc + item.rating,
//         0
//       ) / product.reviews.length;

//     await product.save();

//     res.json({
//       success: true,
//       message: "Review Added Successfully",
//     });

//   } catch (error) {

//     console.log(error);

//     res.json({
//       success: false,
//       message: error.message,
//     });

//   }

// };

// // Get All Reviews
// export const getAllReviews = async (req, res) => {

//   try {

//     const products = await Product.find({});

//     let allReviews = [];

//     products.forEach((product) => {

//       if (product.reviews.length > 0) {

//         const reviews = product.reviews.map((review) => ({
//           ...review._doc,
//           productName: product.name,
//           productImage: product.image[0],
//         }));

//         allReviews.push(...reviews);

//       }

//     });

//     res.json({
//       success: true,
//       reviews: allReviews.reverse(),
//     });

//   } catch (error) {

//     console.log(error);

//     res.json({
//       success: false,
//       message: error.message,
//     });

//   }

// };

// // Delete Product
// export const deleteProduct = async (req, res) => {

//   try {

//     const { id } = req.params;

//     await Product.findByIdAndDelete(id);

//     res.json({
//       success: true,
//       message: "Product Deleted Successfully",
//     });

//   } catch (error) {

//     console.log(error);

//     res.json({
//       success: false,
//       message: error.message,
//     });

//   }

// };

// // Update Product
// export const updateProduct = async (req, res) => {

//   try {

//     const { id } = req.params;

//     const {
//       name,
//       description,
//       quantity,
//       category,
//       price,
//       offerPrice,
//       rating,
//       reviews,
//     } = req.body;

//     await Product.findByIdAndUpdate(id, {
//       name,
//       description,
//       quantity,
//       category,
//       price,
//       offerPrice,
//       rating,
//       numReviews: reviews,
//     });

//     res.json({
//       success: true,
//       message: "Product Updated Successfully",
//     });

//   } catch (error) {

//     console.log(error);

//     res.json({
//       success: false,
//       message: error.message,
//     });

//   }

// };

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