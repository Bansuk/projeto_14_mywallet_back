import connection from '../database/database.js';

async function createSession({ token, user }) {
  try {
    const result = await connection.query(
      'INSERT INTO session(token, user_account_id) VALUES ($1, $2);',
      [token, user.id],
    );

    return result.rowCount;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function findByToken(token) {
  try {
    const result = await connection.query(
      'SELECT * FROM session WHERE token = $1',
      [token],
    );

    return result.rows[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function deleteSession(token) {
  try {
    const result = await connection.query(
      'DELETE FROM session WHERE token = $1',
      [token],
    );

    return result.rows[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { createSession, findByToken, deleteSession };
