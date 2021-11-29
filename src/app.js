import express from 'express';
import cors from 'cors';

import * as userController from './controllers/userController.js';
import * as transactionController from './controllers/transactionController.js';
import { verifyToken } from './middlewares/userMiddleware.js';

const app = express();

app.use(express.json());
app.use(cors({ origin: 'https://projeto-14-mywallet-front-iota.vercel.app' }));

app.post('/sign-up', userController.signUp);
app.post('/sign-in', userController.signIn);
app.delete('/sign-out', verifyToken, userController.signOut);

app.post('/transaction', verifyToken, transactionController.produceTransaction);
app.get('/transactions', verifyToken, transactionController.receiveTransaction);

app.get('/balance', verifyToken, transactionController.receiveBalance);

export default app;
