import faker from 'faker/locale/pt_BR';
import bcrypt from 'bcrypt';
import { insertUser } from '../../src/repositories/userRepository';

async function createUser() {
  const fakePassword = `${faker.internet.password()}!1`;
  const user = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    cleanPassword: fakePassword,
    password: bcrypt.hashSync(fakePassword, 10),
  };

  await insertUser(user);

  return user;
}

export { createUser };
