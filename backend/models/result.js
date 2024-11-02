const mongoose = require("mongoose");

const result = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'quiz', required: true },
  quizName:{ type: [String], required: true },
  topicName:{ type: [String], required: true },
  selectedAnswers: { type: [String], required: true },
  totalmarks:{type:Number},
  marks: { type: Number, required: true },
  dateAttempted: { type: Date, default: Date.now },
});

module.exports = mongoose.model("result", result);
