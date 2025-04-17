const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();
const cors = require('cors');



const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ time: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});


