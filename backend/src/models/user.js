var mongoose = require("mongoose");

var userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      maxlength: 30,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      maxlength: 30,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
