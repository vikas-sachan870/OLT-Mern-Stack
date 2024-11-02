import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AllQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [editQuiz, setEditQuiz] = useState(null);
  const [formData, setFormData] = useState({
    subjectName: '',
    quizTopic: '',
    questions: [],
    time: '',
    totalMarks: ''
  });
  const navigate = useNavigate();
  useEffect(() => {
    const crole = localStorage.getItem("role");
    if (crole !== "admin") {
        navigate("/");
    }
}, [navigate]);
  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get("http://localhost:1000/api/v1/quiz/all-quiz");
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const deleteQuiz = async (id) => {
    try {
      await axios.delete(`http://localhost:1000/api/v1/quiz/delete-quiz/${id}`);
      setQuizzes(quizzes.filter((quiz) => quiz._id !== id));
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  const handleEditClick = (quiz) => {
    setEditQuiz(quiz._id);
    setFormData({
      subjectName: quiz.subjectName,
      quizTopic: quiz.quizTopic,
      questions: quiz.questions,
      time: quiz.time,
      totalMarks: quiz.totalMarks
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:1000/api/v1/quiz-update/${editQuiz}`, formData);
      setQuizzes(quizzes.map((quiz) => (quiz._id === editQuiz ? response.data : quiz)));
      setEditQuiz(null);
      setFormData({
        subjectName: '',
        quizTopic: '',
        questions: [],
        time: '',
        totalMarks: ''
      });
    } catch (error) {
      console.error('Error updating quiz:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center display-6">All Quizzes</h1>
      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th>Sr.No.</th>
            <th>Subject</th>
            <th>Quiz Topic</th>
            <th>Questions</th>
            <th>Time (minutes)</th>
            <th>Total Marks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz, index) => (
            <tr key={quiz._id}>
              <td>{index + 1}</td>
              <td>{quiz.subjectName}</td>
              <td>{quiz.quizTopic}</td>
              <td>
                <ul>
                  {quiz.questions.map((question, idx) => (
                    <li key={idx}>
                      <p>{question.questionText}</p>
                      <ul>
                        {question.options.map((option, oIndex) => (
                          <li key={oIndex}>{option.optionText}</li>
                        ))}
                      </ul>
                      <p><strong>Correct Answer:</strong> {question.correctAnswer}</p>
                    </li>
                  ))}
                </ul>
              </td>
              <td>{quiz.time}</td>
              <td>{quiz.totalMarks}</td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteQuiz(quiz._id)}>Delete</button>
                <button className="btn btn-primary ml-2" onClick={() => handleEditClick(quiz)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllQuiz;
