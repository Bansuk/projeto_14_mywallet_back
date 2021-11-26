import connection from '../database/database.js';

async function insertUser({ name, email, password }) {
  try {
    const result = await connection.query(
      'INSERT INTO user_account(name, email, password) VALUES ($1, $2, $3);',
      [name, email, password],
    );

    return result.rowCount;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function findByEmail(email) {
  try {
    const result = await connection.query(
      'SELECT * FROM user_account WHERE email = $1;',
      [email],
    );

    return result.rows[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { insertUser, findByEmail };
