const { MongoClient } = require("mongodb");
require("dotenv").config();

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error("MONGO_URI is not defined");
  process.exit(1);
}

const client = new MongoClient(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000,
  maxPoolSize: 20,
});

let db;

async function connectToDB() {
  await client.connect();
  db = client.db("nagp");
  console.log("Connected to MongoDB");
}

function getDB() {
  if (!db) throw new Error("DB not initialized");
  return db;
}

module.exports = { connectToDB, getDB };
