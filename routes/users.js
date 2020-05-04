const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

//User Model
const User = require("../models/User");

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
  let errors = [];

  //Check Required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all the fields" });
  }

  //Check Password match
  if (password !== password2) {
    errors.push({ msg: "Password doesn't match" });
  }

  //Check password Length
  if (password.length < 6) {
    errors.push({ msg: "Password should be atleast of 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", { errors, name, email, password, password2 });
  } else {
    //Validated
    //now check for already registered
    User.findOne({ email: email }).then((user) => {
      if (user) {
        //User exists
        errors.push({ msg: "Email is already registered" });
        res.render("register", { errors, name, email, password, password2 });
      } else {
        const newUser = new User({
          name: name,
          email: email,
          password: password,
        });

        //Hash password
        bcrypt.genSalt(10, (err, slt) =>
          bcrypt.hash(newUser.password, slt, (err, hash) => {
            if (err) throw err;
            //Set hashpassword
            newUser.password = hash;

            //save the user to DB
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});

module.exports = router;
