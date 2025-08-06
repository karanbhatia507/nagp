const express = require("express");
const UserModel = require("../models/userModel");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await UserModel.findAll();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:empId", async (req, res) => {
  const { empId } = req.params;
  try {
    const user = await UserModel.findById(empId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/create-user", async (req, res) => {
  const { empId, name, email, phone } = req.body;
  if (!empId || !name || !email || !phone) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const existingUser = await UserModel.findById(empId);
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const newUser = { empId, name, email, phone };
    await UserModel.collection("nagp-users-collection-1").insertOne(newUser);
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:empId", async (req, res) => {
  const { empId } = req.params;

  try {
    const deletedUser = await UserModel.deleteById(empId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully", user: deletedUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
