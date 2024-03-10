import express from 'express';
import {createInventory, addInInventory, removeFromInventory} from '../controllers/inventory'
import { isAdmin } from '../controllers/user';


const inventoryRoute = express.Router();

inventoryRoute.post("/inventory/create/:userId", isAdmin, createInventory)
inventoryRoute.put("/inventory/update/:inventoryId/:userId", isAdmin, addInInventory)
inventoryRoute.put('/inventory/remove/:inventoryId/:userId', isAdmin, removeFromInventory);

export default inventoryRoute;