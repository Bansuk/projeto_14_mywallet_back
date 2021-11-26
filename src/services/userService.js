import bcrypyt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userRepository from '../repositories/userRepository.js';
import * as sessionRepository from '../repositories/sessionRepository.js';

async function wasEmailFound(email) {
  const emailFound = await userRepository.findByEmail(email);

  if (emailFound) return true;
  return false;
}

async function createUser({ name, email, password }) {
  const hashedPassword = bcrypyt.hashSync(password, 10);
  const user = await userRepository.insertUser({
    name,
    email,
    password: hashedPassword,
  });

  return user;
}

async function authenticate({ email, password }) {
  const user = await userRepository.findByEmail(email);

  if (!user || !bcrypyt.compareSync(password, user.password)) {
    return null;
  }

  const token = jwt.sign(
    { id: user.id, name: user.name },
    process.env.JWT_SECRET,
    {
      expiresIn: 900,
    },
  );

  const session = await sessionRepository.createSession({ token, user });

  if (session) return token;

  return null;
}

export { wasEmailFound, createUser, authenticate };
