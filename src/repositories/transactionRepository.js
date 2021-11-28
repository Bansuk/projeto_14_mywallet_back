import connection from '../database/database.js';

async function insertTransaction({ description, value, userId }) {
  try {
    const result = await connection.query(
      'INSERT INTO transaction (description, value, user_account_id) VALUES ($1, $2, $3) RETURNING *;',
      [description, value, userId],
    );

    return result.rows[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getTransactions(user) {
  try {
    const result = await connection.query(
      'SELECT * FROM transaction WHERE user_account_id = $1',
      [user.user_account_id],
    );

    return result.rows;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getBalance(user) {
  try {
    const result = await connection.query(
      'SELECT SUM(value) FROM transaction WHERE user_account_id = $1',
      [user.user_account_id],
    );

    return result.rows[0].sum;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { insertTransaction, getTransactions, getBalance };
