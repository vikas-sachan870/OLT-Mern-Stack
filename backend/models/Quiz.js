const mongoose = require("mongoose");

const quiz = new mongoose.Schema({
  subjectName: {
    type: String,
    required: true,
  },
  quizTopic: {
    type: String,
    required: true,
  },
  questions: {
    type: [
      {
        questionText: {
          type: String,
          required: true,
        },
        options: {
          type: [
            {
              optionText: {
                type: String,
                required: true,
              },
            },
          ],
        },
        correctAnswer: {
          type: String,
          required: true,
        },
      },
    ],
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  totalMarks: {
    type: Number,
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("quiz", quiz);
