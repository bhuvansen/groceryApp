import express from 'express';
import {createOrder} from '../controllers/order'


const orderRoute = express.Router();

orderRoute.post("/order/create", createOrder)

export default orderRoute;