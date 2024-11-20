import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';

const ViewResult = () => {
  const { resultId } = useParams(); 
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    document.title = 'View Result';
    
    const fetchResult = async () => {
      try {
        const response = await axios.get(`https://olt-mern-stack-1.onrender.com/result/oneresult/${resultId}`);
        setResult(response.data.result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [resultId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!result || !result.quiz) {
    return <div>No result found.</div>;
  }

  return (
    <div>
      <NavBar />
      
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Question No.</th>
            <th>Question</th>
            <th>Selected Answer</th>
            <th>Correct Answer</th>
            <th>Correct/Wrong</th>
          </tr>
        </thead>
        <tbody>
          {result.quiz.questions.map((question, index) => {
            const selectedAnswerIndex = result.selectedAnswers[index] ? result.selectedAnswers[index]  : -1; // Adjust for zero-based index
            const selectedAnswer = selectedAnswerIndex >= 0 ? question.options[selectedAnswerIndex]?.optionText : 'Not Choosen';
            const correctAnswerIndex = parseInt(question.correctAnswer, 10) ; // Convert to zero-based index
            const correctAnswer = question.options[correctAnswerIndex]?.optionText || 'N/A'; // Get the correct answer text

            return (
              <tr key={question._id}>
                <td>{index + 1}</td>
                <td>{question.questionText}</td>
                <td>{selectedAnswer}</td>
                <td>{correctAnswer}</td>
                <td>{selectedAnswer === correctAnswer ? 'Correct' : 'Wrong'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ViewResult;
