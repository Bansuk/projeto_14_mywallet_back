import bcrypyt from 'bcrypt';
import * as userRepository from '../repositories/userRepository.js';

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

export { wasEmailFound, createUser };
