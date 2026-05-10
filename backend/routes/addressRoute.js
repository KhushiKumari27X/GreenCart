
import express from 'express';
import authUser from '../middlewares/authUser.js';
import {
    addAddress,
    getAddress
} from '../controllers/addressController.js';

const addressRouter = express.Router();

// ADD ADDRESS
addressRouter.post(
    '/add',
    authUser,
    addAddress
);

// GET USER ADDRESSES
addressRouter.get(
    '/get',
    authUser,
    getAddress
);

export default addressRouter;