
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/sequelize';

interface UserAttributes {
  id: string;
  email: string;
  password: string;
  role: string;
}

// interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

const User = sequelize.define<Model<UserAttributes>>('User', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue:"user"
  },
});

export default User;
