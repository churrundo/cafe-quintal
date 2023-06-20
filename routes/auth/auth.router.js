const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/users");

// Display the signup form
router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

// Handle signup form submissions
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();

  req.session.userId = newUser._id;

  res.redirect("/");
});

// Display the login form
router.get("/login", (req, res) => {
  res.render("auth/login");
});

// Handle login form submissions
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.userId = user._id;
    res.redirect("/");
  } else {
    res.redirect("/auth/login");
  }
});

// Handle logout
router.post("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
