import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import NavBar from "./NavBar";

const Result = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Result";
    const fetchResults = async () => {
      const userId = localStorage.getItem("id"); // Ensure userId is fetched correctly
      if (!userId) {
        setError("User ID not found");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:1000/api/v1/results/${userId}`
        );
        setResults(response.data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (results.length === 0) {
    return <div>No Results Found...</div>;
  }

  return (
    <div>
      <NavBar />
      <h2 className="text-2xl font-bold flex justify-center ">Quiz Results</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Subject Name</th>
            <th>Topic Name</th>
            <th>Total Marks</th>
            <th>Marks Obtained</th>
            <th>Date Attempted</th>
            <th>View Result</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result._id}>
              <td>{result.quizName.join(", ")}</td>
              <td>{result.topicName.join(", ")}</td>
              <td>{result.totalmarks}</td>
              <td>{result.marks}</td>
              <td>{new Date(result.dateAttempted).toLocaleDateString()}</td>
              <td>
                <NavLink
                  to={`/result/myresult/${result._id}`}
                  className="text-blue-600"
                >
                  View Result
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Result;
