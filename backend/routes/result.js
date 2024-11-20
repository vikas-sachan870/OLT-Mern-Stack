const express = require("express");
const router = express.Router();
const Result = require("../models/result");
const User = require("../models/user");
const Quiz=require("../models/Quiz")

// Endpoint to store the result
router.post('/store-result', async (req, res) => {
  try {
    const { quiz, selectedAnswers, totalmarks, marks, userId } = req.body;

    // Input validation
    if (!quiz || !selectedAnswers || typeof marks !== 'number' || !userId) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    // Fetch the quiz to get quizName and topicName
    const quizData = await Quiz.findById(quiz);
    if (!quizData) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Create a new result using the complete schema
    const result = new Result({
      quiz,
      quizName: quizData.subjectName, // Assuming the Quiz model has a 'name' field
      topicName: quizData.quizTopic, // Assuming the Quiz model has a 'topics' field
      selectedAnswers,
      totalmarks:quizData.totalMarks,
      marks,
      userId, // Store the userId in the result
    });

    await result.save();
    
    // Update User to include the result ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure user's results array exists and push the new result
    await User.findByIdAndUpdate(userId, {
      $push: { results: result._id }
    });

    return res.status(201).json({ message: 'Result stored successfully', result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/results/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by userId
    const user = await User.findById(userId).populate('results');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch all results related to the user
    const results = user.results; // Assuming `results` contains an array of result IDs
    return res.status(200).json({ message: 'Results fetched successfully', results });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/result/oneresult/:resultId', async (req, res) => {
  const { resultId } = req.params; 
  try {
    const result = await Result.findById(resultId).populate('quiz');
    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }
    return res.status(200).json({ message: 'Result fetched successfully', result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
