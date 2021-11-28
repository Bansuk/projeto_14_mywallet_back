import jwt from 'jsonwebtoken';
import { createUser } from './userFactory';
import { insertSession } from '../../src/repositories/sessionRepository.js';

async function createSession() {
  const user = await createUser();

  const token = jwt.sign(
    { id: user.id, name: user.name },
    process.env.JWT_SECRET,
  );

  await insertSession({ token, user });

  return token;
}

export { createSession };
