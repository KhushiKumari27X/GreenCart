
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER USER : /api/user/register
export const register = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        // CHECK EMPTY FIELDS
        if (!name || !email || !password) {

            return res.json({
                success: false,
                message: "Missing Details"
            });

        }

        // CHECK EXISTING USER
        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.json({
                success: false,
                message: "User Already Exists"
            });

        }

        // HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        // CREATE USER
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // GENERATE TOKEN
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // SET COOKIE
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        // RESPONSE
        return res.json({
            success: true,
            message: "Registration Successful",
            user: {
                name: user.name,
                email: user.email,
                cartItems: user.cartItems
            }
        });

    } catch (error) {

        console.log(error.message);

        return res.json({
            success: false,
            message: error.message
        });

    }

};

// LOGIN USER : /api/user/login
export const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        // CHECK EMPTY FIELDS
        if (!email || !password) {

            return res.json({
                success: false,
                message: "Email and Password are required"
            });

        }

        // FIND USER
        const user = await User.findOne({ email });

        // CHECK USER
        if (!user) {

            return res.json({
                success: false,
                message: "Invalid Email"
            });

        }

        // CHECK PASSWORD
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {

            return res.json({
                success: false,
                message: "Invalid Password"
            });

        }

        // GENERATE TOKEN
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // SET COOKIE
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        // RESPONSE
        return res.json({
            success: true,
            message: "Login Successful",
            user: {
                name: user.name,
                email: user.email,
                cartItems: user.cartItems
            }
        });

    } catch (error) {

        console.log(error.message);

        return res.json({
            success: false,
            message: error.message
        });

    }

};

// CHECK AUTH : /api/user/is-auth
export const isAuth = async (req, res) => {

    try {

        const userId = req.userId;

        const user = await User.findById(userId)
            .select("-password");

        if (!user) {

            return res.json({
                success: false,
                message: "User Not Found"
            });

        }

        return res.json({
            success: true,
            user
        });

    } catch (error) {

        console.log(error.message);

        return res.json({
            success: false,
            message: error.message
        });

    }

};

// LOGOUT USER : /api/user/logout
export const logout = async (req, res) => {

    try {

        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "strict",
        });

        return res.json({
            success: true,
            message: "Logged Out Successfully"
        });

    } catch (error) {

        console.log(error.message);

        return res.json({
            success: false,
            message: error.message
        });

    }

};