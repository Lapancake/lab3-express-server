// Register user
app.post('/api/users/register', async (req, res) => {
    const {
      first_name, last_name, id_number,
      email, city, zip, username, password
    } = req.body;
  
    try {
      const result = await pool.query(
        `INSERT INTO users
         (first_name, last_name, id_number, email, city, zip, username, password)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING *`,
        [first_name, last_name, id_number, email, city, zip, username, password]
      );
      res.status(201).json({ user: result.rows[0] });
    } catch (err) {
      console.error(err);
      res.status(500).send('User registration failed');
    }
  });
  
  // Login user
  app.post('/api/users/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const result = await pool.query(
        'SELECT * FROM users WHERE username = $1 AND password = $2',
        [username, password]
      );
      if (result.rows.length === 0) {
        res.status(401).json({ error: 'Invalid credentials' });
      } else {
        res.json({ user: result.rows[0] });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Login failed');
    }
  });
  