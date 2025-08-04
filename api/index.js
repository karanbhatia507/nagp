const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

const client = new MongoClient(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000,
});

app.get('/users', async (req, res) => {
  try {
    // await client.connect();
    const result = await client.db("nagp").collection("nagp-collection").find({}).toArray();
    console.log(result);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

app.get('/', (req, res) => {
  res.send('Hello World! ' + ' from the API' + ' running on port ' + port + ' databse URL: ' + process.env.DATABASE_URL);
});

app.listen(port, async() => {
  await client.connect();
  console.log(`API listening at http://localhost:${port}`);
});
