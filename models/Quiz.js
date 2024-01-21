const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const quizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: [{
      type: String,
      default: ""
  }],
  isAnswer: {
    type: Number,
    required:true
  },
  level:{
    type: Number,
    required: true,
  },
  score: {
        type: Number,
        default:0
  },
  language: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Quiz", quizSchema);
