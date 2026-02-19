const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    lowercase: true,
  },
  message: {
    type: String,
    trim: true,
    maxlength: 500,
  },
});
// User model
const User = mongoose.model("User", userSchema);
module.exports = User;
