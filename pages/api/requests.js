import { createPool } from 'mysql2/promise';

// Create a database connection pool

export default async function handler(req, res) {
const pool = createPool(process.env.DATABASE_URL);
  try {
    if (req.method === 'GET') {
      // Retrieve all data from the database
      const [data] = await pool.query('SELECT * FROM requests');
      console.log('Data retrieved successfully!');
      res.status(200).json({
        message: 'Data retrieved successfully!',
        data,
      });
    } else if (req.method === 'POST') {
      // Insert data into the database
      const { amount, email, name, upi_id, pfp } = req.body;
      const errors = [];

      if (!amount) errors.push('No amount specified');
      if (!email) errors.push('No email specified');
      if (!name) errors.push('No name specified');
      if (!upi_id) errors.push('No UPI ID specified');
      if (!pfp) errors.push('No profile_picture specified');

      if (errors.length) {
        res.status(400).json({ error: errors.join(', ') });
      } else {
        const data = [
          amount,
          pfp,
          email,
          name,
          upi_id,
          new Date(),
        ];

        await pool.query(`
          INSERT INTO requests (amount, pfp, email, name, upi_id, date)
          VALUES (?, ?, ?, ?, ?, ?)
        `, data);

        console.log('Data inserted successfully!');
        res.status(200).json({
          message: 'Data inserted successfully!',
          data,
        });
      }
    } else if (req.method === 'DELETE') {
      // Delete data from the database
      const { id } = req.body;
      const errors = [];

      if (!id) errors.push('No ID specified');

      if (errors.length) {
        res.status(400).json({ error: errors.join(', ') });
      } else {
        await pool.query(`
          DELETE FROM requests WHERE id = ?
        `, [id]);
        console.log('Data deleted successfully!');
        res.status(200).json({
          message: 'Data deleted successfully!',
        });
      }
    }
    else {
      // Method not allowed
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  } finally {
    // Close the database connection pool
    await pool.end();
  }
}
