const express = require("express");
const router = express.Router();

//Login Route
router.get("/login", (req, res) => {
  res.render("login");
});

//Register Route
router.get("/register", (req, res) => {
  res.render("register");
});

//Handle Register post req
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let err = [];

  //Check Required fields
  if (!name || !email || !password || !password2) {
    err.push({ msg: "Please fill in all the fields" });
  }

  //Check Password match
  if (password !== password2) {
    err.push({ msg: "Password doesn't match" });
  }

  //Check password Length
  if (password.lenth < 6) {
    err.push({ msg: "Password should be atleast of 6 characters" });
  }

  if (err.length > 0) {
    res.render("register", { err, name, email, password, password2 });
  } else {
    res.send("pass");
  }
});

module.exports = router;
