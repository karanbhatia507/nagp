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

module.exports = router;
