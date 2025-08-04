const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectToDB } = require("./db");
const userRoutes = require("./routes/user");

const app = express();
const port = process.env.PORT || 8000;

// CORS config
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json());

// Routes
app.use("/users", userRoutes);

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.get("/", (req, res) => {
  res.send("Hello World! from the API running on port " + port);
});

const server = app.listen(port, async () => {
  await connectToDB();
  console.log(`Server running at http://localhost:${port}`);
});

// Server shutdown
process.on("SIGINT", async () => {
  console.log("\n Shutting down gracefully...");
  server.close(() => process.exit(0));
});
