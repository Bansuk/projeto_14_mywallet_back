import faker from 'faker/locale/pt_BR';
import bcrypt from 'bcrypt';

async function createBody() {
  // including number and special character since faker doesn't always do it
  const fakePassword = `${faker.internet.password()}!1`;
  const body = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: bcrypt.hashSync(fakePassword, 10),
  };

  return body;
}

export { createBody };
