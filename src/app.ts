import express from 'express';
import userRoutes from './routes/user';
import { syncDatabase } from './config/sequelize';
import dotenv from 'dotenv';
import groceryItemRoute from './routes/groceryItem';
import inventoryRoute from './routes/inventory';
import orderRoute from './routes/order';
dotenv.config()


const app = express();
app.use(express.json())

async function startApplication() {
  try {
    await syncDatabase();

    app.use('/api', userRoutes);
    app.use('/api', groceryItemRoute);
    app.use('/api', inventoryRoute);
    app.use('/api', orderRoute);
    app.listen(3000, () => {
        console.log('The application is listening on port 3000!');
    })
  } catch (error) {
    console.error('Error starting application:', error);
  }
}

startApplication();


