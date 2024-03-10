import express from 'express';
import {createGroceryItem, getAllGroceryItem, removeGroceryItems, removerSingleGrocery, updateGroceryItem} from '../controllers/groceryItem'
import { isAdmin } from '../controllers/user';


const groceryItemRoute = express.Router();

groceryItemRoute.post("/groceryItem/create/:userId", isAdmin, createGroceryItem)
groceryItemRoute.get('/groceryItem/all', getAllGroceryItem);
groceryItemRoute.delete('/groceryItem/delete/:groceryId/:userId', isAdmin, removerSingleGrocery);
groceryItemRoute.delete('/groceryItems/delete/:userId', isAdmin, removeGroceryItems);
groceryItemRoute.put('/groceryItem/:groceryId/:userId', isAdmin, updateGroceryItem)

export default groceryItemRoute;