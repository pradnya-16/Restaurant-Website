const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { signup, signin, signout } = require("../controllers/user");

// signup the user
router.post(
  "/signup",
  [
    check("firstname", "firstname should be at least 3 char").isLength({
      min: 2,
    }),
    check("lastname", "lastname should be at least 3 char").isLength({
      min: 3,
    }),
    check("email", "Please enter valid email").isEmail(),
    check(
      "password",
      "password should be 8 letter long, with at least a symbol, upper and lower case letters and a number"
    )
      .isLength({
        min: 8,
      })
      .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/),
  ],
  signup
);

// login the user
router.post("/signin", signin);

// logout the user
router.get("/signout", signout);

module.exports = router;
