const express = require("express");
const router = express.Router();

//Welcome route
router.get("/", (req, res) => {
  res.render("Welcome");
});

module.exports = router;
