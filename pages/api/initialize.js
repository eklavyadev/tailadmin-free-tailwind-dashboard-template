import { createPool } from 'mysql2/promise';

export default async function handler(req, res) {
  const pool = createPool(process.env.DATABASE_URL);

  if (req.method === 'GET') {
    try {
      const createRequestsTableQuery = `
        CREATE TABLE IF NOT EXISTS requests (
          id INT AUTO_INCREMENT PRIMARY KEY,
          amount INT NOT NULL,
          pfp VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          name VARCHAR(255) NOT NULL,
          upi_id VARCHAR(255) NOT NULL,
          date DATETIME NOT NULL
        )
      `;
      const createTransactionsTableQuery = `
        CREATE TABLE IF NOT EXISTS transactions (
          id BINARY(16) DEFAULT (UUID_TO_BIN(UUID())) PRIMARY KEY,
          amount INT NOT NULL,
          upi_id VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          date DATETIME NOT NULL
        )
      `;
      await pool.query(createRequestsTableQuery);
      await pool.query(createTransactionsTableQuery);
      console.log('Table created successfully!');
      res.status(200).json({
        message: 'Table created successfully!',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Error creating table!',
      });
    } finally {
      pool.end(); // close the connection pool
    }
  }

  if (req.method === 'DELETE') {
    try {
      const dropTableQuery = `DROP TABLE IF EXISTS requests`;
      const result = await pool.query(dropTableQuery);
      console.log('Table deleted successfully!');
      res.status(200).json({
        message: 'Table deleted successfully!',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Error deleting table!',
      });
    } finally {
      pool.end(); // close the connection pool
    }
  }
}
