import express from 'express';
const { signup, signin, signout } = require('../controllers/user')

const userRoute = express.Router();

userRoute.post('/signup', signup);

userRoute.post('/signin', signin);

userRoute.post('/signout', signout);


export default userRoute;
