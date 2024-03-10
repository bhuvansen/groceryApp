import { Request, Response, NextFunction } from "express"
import GroceryItem from "../models/groceryItem"
const { v4: uuidv4 } = require("uuid")
import { Model } from 'sequelize';

export const createGroceryItem = async (req: Request, res: Response) => {
    let { name, price, currency, unit } = req.body
    try {
        const existingGroceryItem = await GroceryItem.findOne({ where: { name } })
        if (existingGroceryItem) {
            return res.status(400).json({ message: "GroceryItem already exists" })
        }
        await GroceryItem.create({ name, price, currency, unit, id: uuidv4() })
        res.status(201).json({ message: "GroceryItem created successfully" })
    } catch (error) {
        console.log("ERROR HERE", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const getAllGroceryItem = async (req: Request, res: Response) => {
    try {
        const items = await GroceryItem.findAll()
        res.status(200).json(items)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const removerSingleGrocery  = async (req: Request, res: Response) => {
    let id = req.params.groceryId
    if (!id) {
        return res.status(400).json({ message: "Grocery ID is required." })
    }
    try {
        let item = await GroceryItem.findByPk(id)
        if (!item) {
            return res.status(404).json({ message: "Grocery item not found." })
        }
        await item.destroy()
        res.json({ message: "Grocery item removed from successfully DB" })
    } catch (error) {
        console.error("Error removing grocery item:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const removeGroceryItems = async (req: Request, res: Response) => {
    try {
        let groceryList: string[] = req.body.groceryList

        if (!groceryList || !Array.isArray(groceryList)) {
            return res.status(400).json({ message: "Ids for groceries should be in an array" })
        }
        let nonDeletedArray = []
        for (let id of groceryList) {
            const item = await GroceryItem.findByPk(id)
            if (!item) {
                nonDeletedArray.push(id)
                continue
            }
            await item.destroy()
        }

        res.json({
            message: `Grocery items removed successfully ${
                nonDeletedArray.length > 0 ? "but following ids are not present in database." : "from DB."
            }`,
            nonDeletedIds: nonDeletedArray,
        })
    } catch (error) {
        console.error("Error removing grocery items:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const updateGroceryItem = async (req: Request, res: Response) => {
  let id = req.params.groceryId
  if (!id) {
      return res.status(400).json({ message: "Grocery ID is required." })
  }
  try{
    let { name, price, currency, unit } = req.body
    const item :any = await GroceryItem.findByPk(id) 
    if (!item) {
      return res.status(404).json({ message: "Grocery item not found." })
  }
  if (name) {
    item.name = name;
  }
  if (price) {
    item.price = price;
  }
  if (currency) {
    item.currency = currency;
  }
  if (unit) {
    item.unit = unit;
  }
  await item.save();

  res.json({ message: 'Grocery item updated successfully.', updatedItem: item });


  }catch(error){
    console.error('Error updating grocery item:', error);
    res.status(500).json({ message: 'Internal server error' });

  }
}