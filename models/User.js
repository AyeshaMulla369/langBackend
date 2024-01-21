const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  score: {
    English: {
      type: Number,
      default: 0
    },
    German: {
      type: Number,
      default: 0
    },
    French:{
        type: Number,
        default:0
    }
  },
});

module.exports = mongoose.model("User", userSchema);
