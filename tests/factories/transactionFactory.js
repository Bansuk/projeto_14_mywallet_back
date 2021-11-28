import faker from 'faker/locale/pt_BR';

function createTransaction() {
  const body = {
    description: faker.lorem.words(3),
    value: faker.datatype.number(),
  };

  return body;
}

export { createTransaction };
