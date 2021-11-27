import faker from 'faker/locale/pt_BR';
import bcrypt from 'bcrypt';

async function createBody() {
  const fakePassword = `${faker.internet.password()}!1`;
  const body = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: bcrypt.hashSync(fakePassword, 10),
  };

  return body;
}

export { createBody };
