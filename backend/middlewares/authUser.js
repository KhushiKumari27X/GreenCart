
import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {

    // GET TOKEN FROM COOKIES
    const token = req.cookies.token;

    // CHECK TOKEN
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized Login Again"
      });
    }

    // VERIFY TOKEN
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // SAVE USER ID
    req.userId = decoded.id;

    next();

  } catch (error) {

    console.log("Auth Error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid Token"
    });

  }
};

export default authUser;