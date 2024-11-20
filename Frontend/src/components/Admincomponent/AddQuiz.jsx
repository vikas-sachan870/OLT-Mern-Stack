import React, { useState ,useNavigate} from 'react';
import axios from 'axios';

const AddQuiz = () => {
  const [subjectName, setSubjectName] = useState('');
  const [quizTopic, setQuizTopic] = useState('');
  const [numQuestions, setNumQuestions] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [time, setTime] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const navigate = useNavigate();
//   useEffect(() => {
//     const crole = localStorage.getItem("role");
//     if (crole !== "admin") {
//         navigate("/");
//     }
// }, [navigate]);
  const handleNumQuestionsChange = (event) => {
    const number = parseInt(event.target.value, 10);
    setNumQuestions(number);
    setQuestions(
      Array.from({ length: number }, () => ({
        questionText: '',
        options: [
          { optionText: '' },
          { optionText: '' },
          { optionText: '' },
          { optionText: '' },
        ],
        correctAnswer: '',
      }))
    );
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].questionText = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex].optionText = value;
    setQuestions(newQuestions);
  };

  const handleCorrectOptionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].correctAnswer = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const quizDetails = {
      subjectName,
      quizTopic,
      time: parseInt(time),
      totalMarks: parseInt(totalMarks),
      questions,
    };

    try {
      const response = await axios.post("http://localhost:1000/api/v1/quiz/createquiz", quizDetails);
      console.log(response.data);
      // Optionally reset form fields or perform other actions upon successful submission
    } catch (error) {
      console.error('Error creating quiz:', error);
      // Handle error state or display error message
    }
  };

  return (
    <div className="modal fade" id="AddQuiz" tabIndex="-1" aria-labelledby="AddQuizLabel" aria-hidden="true">
      <div className="modal-dialog modal-sl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="AddQuizLabel">Fill Quiz Details</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <p>Subject Name</p>
                <input
                  type="text"
                  className="form-control"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  placeholder="Enter subject name"
                  required
                />
              </div>
              <div className="form-group">
                <p>Quiz Topic</p>
                <input
                  type="text"
                  className="form-control"
                  value={quizTopic}
                  onChange={(e) => setQuizTopic(e.target.value)}
                  placeholder="Enter quiz topic"
                  required
                />
              </div>
              <div className="form-group">
                <p>Number of Questions</p>
                <input
                  type="number"
                  className="form-control"
                  value={numQuestions}
                  onChange={handleNumQuestionsChange}
                  placeholder="Enter number of questions"
                  required
                />
              </div>
              {questions.map((q, qIndex) => (
                <div key={qIndex}>
                  <div className="form-group">
                    <p>Question {qIndex + 1}</p>
                    <input
                      type="text"
                      className="form-control"
                      value={q.questionText}
                      onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                      placeholder={`Enter question ${qIndex + 1}`}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <p>Options for Question {qIndex + 1}</p>
                    {q.options.map((opt, oIndex) => (
                      <input
                        key={oIndex}
                        type="text"
                        className="form-control"
                        value={opt.optionText}
                        onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                        placeholder={`Option ${oIndex + 1}`}
                        required
                      />
                    ))}
                  </div>
                  <div className="form-group">
                    <p>Correct Option for Question {qIndex + 1}</p>
                    <select
                      className="form-control"
                      value={q.correctAnswer}
                      onChange={(e) => handleCorrectOptionChange(qIndex, e.target.value)}
                      required
                    >
                      <option value="">Select correct option</option>
                      {q.options.map((opt, oIndex) => (
                        <option key={oIndex} value={oIndex}>{`Option ${oIndex + 1}`}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
              <div className="form-group">
                <p>Timer</p>
                <input
                  type="number"
                  className="form-control"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="Enter time"
                  required
                />
              </div>
              <div className="form-group">
                <p>Total Marks</p>
                <input
                  type="number"
                  className="form-control"
                  value={totalMarks}
                  onChange={(e) => setTotalMarks(e.target.value)}
                  placeholder="Enter total marks"
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Add Quiz</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuiz;
