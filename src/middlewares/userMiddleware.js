/* eslint-disable consistent-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable dot-notation */
import jwt from 'jsonwebtoken';
import { findByToken } from '../repositories/sessionRepository.js';

async function verifyToken(req, res, next) {
  const authorization = req.headers['authorization'];
  const token = authorization?.split('Bearer ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) return res.sendStatus(401);
  });

  const session = await findByToken(token);

  if (!session) return res.sendStatus(401);

  req.user = session;

  next();
}

export { verifyToken };
