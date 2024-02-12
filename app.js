const express = require('express');
const sql = require('mssql');
const cors = require('cors'); // Import the cors middleware
 
const app = express();
const port = 3000;
 
// Configuration for your SQL Server
const config = {
  user: 'bootcamp',
  password: 'Pass@123',
  server: 'bootcampfeb5.database.windows.net',
  database: 'bootcamp',
};
 
// Use the cors middleware
app.use(cors());
 
// Route to fetch and display top 20 rows from SalesLT.Customer
app.get('/non_merged_table', async (req, res) => {
  try {
    // Connect to SQL Server
    await sql.connect(config);
   
    // Query to fetch top 20 rows from SalesLT.Customer
    const result = await sql.query`SELECT TOP 20 * FROM SalesLT.Customer`;
   
    // Send the fetched data to the client
    res.json(result.recordset);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('An error occurred while fetching data.');
  }
});
app.get('/combineddata', async (req, res) => {
    try {
      // Connect to SQL Server
      await sql.connect(config);
  
      // Query to join SalesLT.ProductCategory and SalesLT.Product tables
      const result = await sql.query`
        SELECT TOP 20
          P.Name,
          P.Color,
          P.Size,
          P.Weight
        FROM
          SalesLT.Product P
        INNER JOIN
          SalesLT.ProductCategory PC ON P.ProductCategoryID = PC.ProductCategoryID`;
  
      // Send the fetched data to the client
      res.json(result.recordset);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('An error occurred while fetching data.');
    } finally {
      // Close the SQL connection
      await sql.close();
    }
  });
  
   
// Start the server
 
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});