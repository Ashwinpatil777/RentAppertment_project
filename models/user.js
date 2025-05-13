const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

userSchema.plugin(passportLocalMongoose); // Adds username, hash, salt, and authentication methods

module.exports = mongoose.model("User", userSchema);
