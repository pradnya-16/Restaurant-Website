const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const User = require("../models/user");

//signUp
exports.signup = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const { firstname, lastname, email, password } = req.body;

  console.log(req.body);

  const userEmail = await User.findOne({ email: email });

  if (userEmail) {
    return res.status(409).json({
      error: "Email already exist.",
    });
  }

  //hashing user password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = new User({
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: hashPassword,
  });

  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "failed to signup.",
      });
    }

    return res.send("<h1>User has been successfully signup<h1/>");
  });
};

//signIn
exports.signin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    // check user password
    const validPassword = await bcrypt.compare(password, user.password);

    if (validPassword) {
      // return res.json({ token, user: { _id } });
      return res.send("<h1>User has been successfully Logged In <h1/>");
    } else {
      res.status(400).json({ error: "Invalid Password or Email" });
    }
  } else {
    res.status(401).json({ error: "You don't have an account." });
  }
};

//signOut
exports.signout = (req, res) => {
  try {
    res.status(200).json({
      message: "User signout successfully",
    });
  } catch (error) {
    res.status(400).json({
      error: "Server Error",
    });
  }
};
