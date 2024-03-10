import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'mysql', 
  host: 'localhost', 
  username: 'root',
  password: '12345',
  database: 'groceryapis',
});
async function syncDatabase() {
  try {
    await sequelize.sync({ force: false }); // Set force to true to drop existing tables
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
}

export { sequelize, syncDatabase };
