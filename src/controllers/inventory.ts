import { Request, Response, NextFunction } from "express"
import Inventory from "../models/inventory"
const { v4: uuidv4 } = require("uuid")

export const createInventory = async (req: Request, res: Response) => {
    let { name, quantity} = req.body
    try {
        const existingInventory = await Inventory.findOne({ where: { name } })
        if (existingInventory) {
            return res.status(400).json({ message: "Inventory already exists" })
        }
        await Inventory.create({name, quantity, id: uuidv4() })
        res.status(200).json({ message: "Inventory created successfully" })
    } catch (error) {
        console.log("ERROR HERE", error)
        res.status(500).json({ message: "Internal server error" })
    }
}
export const addInInventory = async (req:Request, res:Response): Promise<void> =>{
    const { quantity} = req.body
    const id  = req.params.inventoryId
    try{
        const groceryInventory :any = await Inventory.findByPk(id)
        if(groceryInventory){
            groceryInventory.quantity += quantity
            await groceryInventory.save()
            res.status(200).json({message: "Inventory updated", inventory: {name:groceryInventory.name, quantity:groceryInventory.quantity}})
        }else{
            res.status(404).json({error: "Inventory not found"})
        }
    }catch(error){
        console.log("ERROR HERE", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const removeFromInventory = async(req:Request, res:Response): Promise<void> =>{
    const { quantity} = req.body
    const id  = req.params.inventoryId

    try{
        const groceryInventory :any = await Inventory.findByPk(id)
        if(groceryInventory){
            if (groceryInventory.quantity >= quantity) {
                groceryInventory.quantity -= quantity
                await groceryInventory.save()
                res.status(200).json({message: "Inventory updated", inventory: {name:groceryInventory.name, quantity:groceryInventory.quantity}})
            }else{
                res.status(400).json({message: `Only ${groceryInventory.quantity} are available in inventory, so cannot remove ${quantity} quantity.`})
            }
        }else{
            res.status(404).json({error: "Inventory not found"})
        }
    }catch(error){
        console.log("ERROR HERE", error)
        res.status(500).json({ message: "Internal server error" })
    }
}