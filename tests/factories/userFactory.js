import faker from 'faker/locale/pt_BR';
import bcrypt from 'bcrypt';
import { insertUser } from '../../src/repositories/userRepository';

async function createUser() {
  // including number and special character since faker doesn't always do it
  const password = `${faker.internet.password()}!1`;
  const user = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: bcrypt.hashSync(password, 10),
  };

  await insertUser(user);

  return user;
}

export { createUser };
