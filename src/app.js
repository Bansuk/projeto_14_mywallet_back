import express from 'express';
import cors from 'cors';

import * as userController from './controllers/userController.js';

const app = express();

app.use(express.json());
app.use(cors());

app.post('/sign-up', userController.signUp);
app.post('/sign-in', userController.signIn);

export default app;
