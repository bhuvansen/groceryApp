
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelize';

export interface InventoryAttributes {
  id: string;
  name: string;
  quantity: number
}


const Inventory = sequelize.define<Model<InventoryAttributes>>('Inventory', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue:0
  }
});

export default Inventory;
