
// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import "dotenv/config";

// import connectDB from "./configs/db.js";
// import connectCloudinary from "./configs/cloudinary.js";

// import userRouter from "./routes/userRoute.js";
// import sellerRouter from "./routes/sellerRoute.js";
// import productRouter from "./routes/productRoute.js";
// import cartRouter from "./routes/cartRoute.js";
// import addressRouter from "./routes/addressRoute.js";
// import orderRouter from "./routes/orderRoute.js";
// import { stripeWebhooks } from "./controllers/orderController.js";

// const app = express();

// const port = process.env.PORT || 4000;

// // DATABASE CONNECTION
// await connectDB();

// // CLOUDINARY CONNECTION
// await connectCloudinary();

// // ALLOWED ORIGINS
// const allowedOrigins = [
//     "http://localhost:5173",
//     "http://localhost:5174",
//     "https://green-cart-mocha-phi.vercel.app"
// ];

// app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks)

// // MIDDLEWARES
// app.use(express.json());

// app.use(cookieParser());

// app.use(
//     cors({
//         origin: allowedOrigins,
//         credentials: true,
//     })
// );

// // TEST ROUTE
// app.get("/", (req, res) => {

//     res.send("API is Working");

// });

// // ROUTES
// app.use("/api/user", userRouter);

// app.use("/api/seller", sellerRouter);

// app.use("/api/product", productRouter);

// app.use("/api/cart", cartRouter);

// app.use("/api/address", addressRouter);

// app.use("/api/order", orderRouter);

// // SERVER
// app.listen(port, () => {

//     console.log(
//         `Server is running on http://localhost:${port}`
//     );

// });
// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import "dotenv/config";

// import connectDB from "./configs/db.js";
// import connectCloudinary from "./configs/cloudinary.js";

// import userRouter from "./routes/userRoute.js";
// import sellerRouter from "./routes/sellerRoute.js";
// import productRouter from "./routes/productRoute.js";
// import cartRouter from "./routes/cartRoute.js";
// import addressRouter from "./routes/addressRoute.js";
// import orderRouter from "./routes/orderRoute.js";

// import { stripeWebhooks } from "./controllers/orderController.js";

// const app = express();

// // DATABASE CONNECTION
// await connectDB();

// // CLOUDINARY CONNECTION
// await connectCloudinary();

// // STRIPE WEBHOOK
// app.post(
//   "/stripe",
//   express.raw({ type: "application/json" }),
//   stripeWebhooks
// );

// // MIDDLEWARES
// app.use(express.json());

// app.use(cookieParser());

// app.use(
//   cors({
//     origin: true,
//     credentials: true,
//   })
// );

// // TEST ROUTE
// app.get("/", (req, res) => {
//   res.send("API is Working");
// });

// // ROUTES
// app.use("/api/user", userRouter);

// app.use("/api/seller", sellerRouter);

// app.use("/api/product", productRouter);

// app.use("/api/cart", cartRouter);

// app.use("/api/address", addressRouter);

// app.use("/api/order", orderRouter);

// // EXPORT APP
// export default app;


// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import "dotenv/config";

// import connectDB from "./configs/db.js";
// import connectCloudinary from "./configs/cloudinary.js";

// import userRouter from "./routes/userRoute.js";
// import sellerRouter from "./routes/sellerRoute.js";
// import productRouter from "./routes/productRoute.js";
// import cartRouter from "./routes/cartRoute.js";
// import addressRouter from "./routes/addressRoute.js";
// import orderRouter from "./routes/orderRoute.js";

// import { stripeWebhooks } from "./controllers/orderController.js";

// const app = express();

// // ==========================================
// // DATABASE CONNECTION
// // ==========================================
// await connectDB();

// // ==========================================
// // CLOUDINARY CONNECTION
// // ==========================================
// await connectCloudinary();

// // ==========================================
// // STRIPE WEBHOOK
// // ==========================================
// app.post(
//   "/stripe",
//   express.raw({ type: "application/json" }),
//   stripeWebhooks
// );

// // ==========================================
// // CORS CONFIG
// // ==========================================
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://green-cart-mocha-phi.vercel.app"
//     ],
//     credentials: true,
//   })
// );

// // ==========================================
// // MIDDLEWARES
// // ==========================================
// app.use(express.json());

// app.use(cookieParser());

// // ==========================================
// // TEST ROUTE
// // ==========================================
// app.get("/", (req, res) => {
//   res.send("API is Working");
// });

// // ==========================================
// // ROUTES
// // ==========================================
// app.use("/api/user", userRouter);

// app.use("/api/seller", sellerRouter);

// app.use("/api/product", productRouter);

// app.use("/api/cart", cartRouter);

// app.use("/api/address", addressRouter);

// app.use("/api/order", orderRouter);

// // ==========================================
// // EXPORT APP
// // ==========================================
// export default app;

// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import "dotenv/config";

// import connectDB from "./configs/db.js";
// import connectCloudinary from "./configs/cloudinary.js";

// import userRouter from "./routes/userRoute.js";
// import sellerRouter from "./routes/sellerRoute.js";
// import productRouter from "./routes/productRoute.js";
// import cartRouter from "./routes/cartRoute.js";
// import addressRouter from "./routes/addressRoute.js";
// import orderRouter from "./routes/orderRoute.js";

// const app = express();

// // DATABASE
// connectDB();

// // CLOUDINARY
// connectCloudinary();

// // CORS
// app.use(cors({
//   origin: "https://green-cart-mocha-phi.vercel.app",
//   credentials: true
// }));

// // MIDDLEWARES
// app.use(express.json());
// app.use(cookieParser());

// // TEST ROUTE
// app.get("/", (req, res) => {
//   res.send("API Working");
// });

// // ROUTES
// app.use("/api/user", userRouter);
// app.use("/api/seller", sellerRouter);
// app.use("/api/product", productRouter);
// app.use("/api/cart", cartRouter);
// app.use("/api/address", addressRouter);
// app.use("/api/order", orderRouter);

// export default app;

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
  origin: "https://green-cart-mocha-phi.vercel.app",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API Working");
});

export default app;