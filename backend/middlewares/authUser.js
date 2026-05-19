import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authUser = async (req, res, next) => {

  try {

    // GET TOKEN FROM COOKIES
    const token = req.cookies.token;

    // CHECK TOKEN
    if (!token) {

      return res.status(401).json({
        success: false,
        message: "Not Authorized Login Again",
      });

    }

    // VERIFY TOKEN
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // FIND USER
    const user = await User.findById(
      decoded.id
    ).select("-password");

    // CHECK USER
    if (!user) {

      return res.status(401).json({
        success: false,
        message: "User Not Found",
      });

    }

    // SAVE USER DATA
    req.user = user;

    // OPTIONAL
    req.userId = user._id;

    next();

  } catch (error) {

    console.log("Auth Error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });

  }

};

export default authUser;