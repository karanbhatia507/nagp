const { MongoClient } = require("mongodb");
require("dotenv").config();

const { USERNAME, PASSWORD, MONGO_HOST, MONGO_PORT, MONGO_DB, MONGO_AUTH_SOURCE } = process.env;

const mongoUri = `mongodb://${USERNAME}:${PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=${MONGO_AUTH_SOURCE}`

if (!USERNAME || !PASSWORD || !MONGO_HOST || !MONGO_PORT || !MONGO_DB || !MONGO_AUTH_SOURCE) {
  console.error("MONGO_URI cannot be constructed");
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
  db = client.db(MONGO_DB);
  console.log("Connected to MongoDB");
}

function getDB() {
  if (!db) throw new Error("DB not initialized");
  return db;
}

module.exports = { connectToDB, getDB };
