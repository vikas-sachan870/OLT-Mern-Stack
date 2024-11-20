const Quiz = require("../models/Quiz");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userauth");

router.get("/quiz/fetch-subject", async (req, res) => {
  try {
    const subjects = await Quiz.distinct("subjectName");

    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/quiz/all-quiz", async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.send(quizzes);
  } catch (err) {
    res.status(500).send({ message: "An error occurred", error: err.message });
  }
});

router.post("/quiz/createquiz", async (req, res) => {
  try {
    
    const quizData = req.body;
    const newQuiz = new Quiz(quizData);
    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/quiz/fetch-topic/:subjectName", async (req, res) => {
  const subjectName = req.params.subjectName;
  try {
    const topics = await Quiz.find({ subjectName: subjectName });
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/quiz/delete-quiz/:id", async (req, res) => {
  try {
    const { id: quizId } = req.params; // Extract the quiz ID from route parameters

    // Validate quiz ID
    if (!quizId) {
      return res.status(400).json({ message: "Quiz ID is required." });
    }

    // Find and delete the quiz
    const quiz = await Quiz.findByIdAndDelete(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found." });
    }


    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    console.error("Error during quiz deletion:", error.message);
    res.status(500).json({ message: "An internal error occurred.", error: error.message });
  }
});
router.put("/quiz-update/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedQuiz) {
      return res.status(404).send({ message: "Quiz not found" });
    }

    res.status(200).send(updatedQuiz);
  } catch (err) {
    res.status(500).send({ message: "Error updating quiz", error: err });
  }
});

router.get("/quiz/fetch-quiz/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
