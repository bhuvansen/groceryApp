
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelize';


export interface OrderAttributes {
  id: string;
  userId: string;
  groceryId: string;
  groceryName: string;
  pricePerUnit: number;
  unitOrdered: number;
  currency: string
}


const Order = sequelize.define<Model<OrderAttributes>>('Order', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  userId:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  groceryId: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true,
  },
  groceryName: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true,
  },
  pricePerUnit: {
    type: DataTypes.FLOAT(10, 2),
    allowNull: false,
  },
  unitOrdered: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  currency:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  
});

export default Order;
