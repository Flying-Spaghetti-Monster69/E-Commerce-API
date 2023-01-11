const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a name"],
    minlenght: 3,
    maxlenght: 50,
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
    minlenght: 6,
  },
  email: {
    type: String,
    required: [true, "please provide a email"],
    validate: {
      validator: validator.isEmail,
      message: "please provide a valid email",
    },
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

module.exports = mongoose.model("User", UserSchema);
