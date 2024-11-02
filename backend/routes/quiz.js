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

router.delete("/quiz/delete-quiz/:id",authenticateToken, async (req, res) => {
  try {
    const quizId = req.params.id;
    const requesterId = req.user.id;
    const requesterUser = await User.findById(requesterId);
    if (requesterUser.role !== "admin") {
      return res.status(403).send({ message: "You do not have permission to perform this action" });
    }
    const result = await Quiz.findByIdAndDelete(quizId);

    if (!result) {
      return res.status(404).send({ message: "Quiz not found" });
    }

    res.send({ message: "Quiz deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: "An error occurred", error: err.message });
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
