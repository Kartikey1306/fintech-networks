const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'mysecretpassword',
  port: 5432
});

// Fetch balance
app.get('/balance', async (req, res) => {
  try {
    const userId = req.query.user_id;
    const query = 'SELECT balance FROM accounts WHERE user_id = $1';
    const { rows } = await pool.query(query, [userId]);
    if (rows.length > 0) {
      res.json({ balance: rows[0].balance });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching balance:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Perform a transaction
app.post('/transactions', async (req, res) => {
  const { userId, type, amount } = req.body;
  try {
    await pool.query('BEGIN');
    const querySelect = 'SELECT balance FROM accounts WHERE user_id = $1';
    const { rows } = await pool.query(querySelect, [userId]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    let newBalance = rows[0].balance;

    if (type === 'deposit') {
      newBalance += amount;
    } else if (type === 'withdrawal') {
      if (newBalance < amount) {
        res.status(400).json({ error: 'Insufficient funds' });
        return;
      }
      newBalance -= amount;
    } else {
      res.status(400).json({ error: 'Invalid transaction type' });
      return;
    }

    const queryUpdate = 'UPDATE accounts SET balance = $1 WHERE user_id = $2';
    await pool.query(queryUpdate, [newBalance, userId]);

    const queryInsert = 'INSERT INTO transactions(account_id, type, amount) VALUES($1, $2, $3)';
    await pool.query(queryInsert, [userId, type, amount]);

    await pool.query('COMMIT');
    res.json({ message: `${type} successful`, balance: newBalance });
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error('Error performing transaction:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:8080`);
});
