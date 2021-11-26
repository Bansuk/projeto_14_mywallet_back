import connection from '../../src/database/database';

async function clearDatabase(relation) {
  await connection.query(`DELETE FROM ${relation}`);
}

async function closeConnection() {
  await connection.end();
}

export { clearDatabase, closeConnection };
