// Get all items
app.get('/api/items', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM items');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Failed to fetch items');
    }
  });
  
  // Add a new item
  app.post('/api/items', async (req, res) => {
    const { name, description } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *',
        [name, description]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Failed to add item');
    }
  });
  