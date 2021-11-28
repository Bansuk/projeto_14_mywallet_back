import faker from 'faker/locale/pt_BR';
import bcrypt from 'bcrypt';
import { insertUser } from '../../src/repositories/userRepository';

function createUserBody() {
  const fakePassword = `${faker.internet.password()}!1`;
  const user = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    cleanPassword: fakePassword,
    password: bcrypt.hashSync(fakePassword, 10),
  };

  return user;
}

async function createUser() {
  const user = createUserBody();

  const result = await insertUser(user);

  user.id = result.id;

  return user;
}

export { createUserBody, createUser };
