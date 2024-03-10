
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelize';

export interface GroceryItemAttributes {
  id: string;
  name: string;
  price: number;
  currency: string;
  unit: string
}


const GroceryItem = sequelize.define<Model<GroceryItemAttributes>>('GroceryItem', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT(10, 2),
    allowNull: false,
    defaultValue: 0.0,
  },
});

export default GroceryItem;
