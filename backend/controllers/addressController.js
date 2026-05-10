import Address from "../models/Address.js";

// ADD ADDRESS : /api/address/add
export const addAddress = async (req, res) => {

    try {

        // userId comes from auth middleware
        const userId = req.userId;

        const { address } = req.body;

        if (!address) {
            return res.json({
                success: false,
                message: "Address data is required"
            });
        }

        await Address.create({
            ...address,
            userId
        });

        res.json({
            success: true,
            message: "Address added successfully"
        });

    } catch (error) {

        console.log(error.message);

        res.json({
            success: false,
            message: error.message
        });

    }

};

// GET ADDRESS : /api/address/get
export const getAddress = async (req, res) => {

    try {

        // userId comes from auth middleware
        const userId = req.userId;

        const addresses = await Address.find({ userId });

        res.json({
            success: true,
            addresses
        });

    } catch (error) {

        console.log(error.message);

        res.json({
            success: false,
            message: error.message
        });

    }

};