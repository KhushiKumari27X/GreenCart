
import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {

    try {

        const token = req.cookies.token;

        // CHECK TOKEN
        if (!token) {

            return res.json({
                success: false,
                message: "Not Authorized"
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

        console.log(error.message);

        return res.json({
            success: false,
            message: error.message
        });

    }

};

export default authUser;