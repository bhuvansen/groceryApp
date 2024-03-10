import { Request, Response, NextFunction } from "express"
import Order from "../models/order"
const { v4: uuidv4 } = require("uuid")

type OrderAttributes = {
    userId: string;
    groceryId: string;
    groceryName: string;
    pricePerUnit: number;
    unitOrdered: number;
    currency: string
  }
  const isOrderAttributes = (obj: OrderAttributes): boolean => {
    return (
      typeof obj.userId === 'string' &&
      typeof obj.groceryId === 'string' &&
      typeof obj.groceryName === 'string' &&
      typeof obj.pricePerUnit === 'number' &&
      typeof obj.unitOrdered === 'number' &&
      typeof obj.currency === 'string'
    );
  };
export const createOrder = async (req: Request, res: Response) => {
    if(!req.body.orderedList){
        res.status(400).json({error: "Ordered list is missing or empty"})
    }
    let { orderedList } = req.body
    for(let obj of orderedList){
        if (!isOrderAttributes(obj)) {
            res.status(400).json({error: "Ordered list is not of correct format"})
            return
        } 
    }
    let totalBillAmount = 0
    try {
        for(let orderObj of orderedList){
            let {  groceryId , userId, groceryName, pricePerUnit, unitOrdered, currency}  = orderObj

            let order =  { id:uuidv4(), userId,  groceryId , groceryName, pricePerUnit, unitOrdered, currency} 
            await Order.create(order)
            totalBillAmount +=  unitOrdered*pricePerUnit
        }
        res.status(200).json({ message: "Order created successfully" , orderedList, totalBillAmount})
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
}