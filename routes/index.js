const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.render("index", { title: "Café Quintal" });
});

router.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

module.exports = router;
