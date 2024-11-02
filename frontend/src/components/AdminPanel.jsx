// AdminPanel.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserImage from '../image/user.jpg';
import UserSubject from '../image/total_subjects.jpg';
import UserQuiz from '../image/quiz.jpg';
import AddSubject from '../image/add_subject.jpg';
import AddQuiz from '../image/add_quiz.jpg';
import DeleteImage from '../image/delete_image.png';
import NavBar from './NavBar';
import axios from 'axios';

const AdminPanel = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const crole = localStorage.getItem("role");
        if (crole !== "admin") {
            navigate("/");
        }
    }, [navigate]);

    useEffect(() => {
        document.title = 'Admin Panel';
    }, []);

    const [numQuestions, setNumQuestions] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [subjectName, setSubjectName] = useState('');
    const [quizTopic, setQuizTopic] = useState('');
    const [time, setTime] = useState('');
    const [totalMarks, setTotalMarks] = useState('');

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
                correctAnswer: ''
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const quizDetails = {
            subjectName,
            quizTopic,
            time,
            totalMarks,
            questions
        };
        console.log(quizDetails);
        axios.post("http://localhost:1000/api/v1/quiz/createquiz", quizDetails)
            .then(result => {
                console.log(result);
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <NavBar />
            <div className='flex mx-14 ml-16'>
                <div className='container'>
                    <div className="row mt-6">
                        <div className="col-md-4">
                            <a onClick={() => navigate('/admin/alluser')} className="tt">
                                <div className="card pt-2 h-[250px] w-[400px] outline outline-1 outline-red-500">
                                    <div className="card-body text-center m-auto">
                                        <div className="">
                                            <img className="img-fluid w-[90px]" alt="Users" src={UserImage} />
                                        </div>
                                    </div>
                                    <h1 className='text-4xl font-semibold text-center mb-5'>
                                        8<br />Total Users
                                    </h1>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <div className="row mt-6">
                        <div className="col-md-4">
                            <a href="#" className="tt">
                                <div className="card pt-2 h-[250px] w-[400px] outline outline-1 outline-red-500">
                                    <div className="card-body text-center m-auto">
                                        <div className="">
                                            <img className="img-fluid w-[90px]" alt="Subjects" src={UserSubject} />
                                        </div>
                                    </div>
                                    <h1 className='text-4xl font-semibold text-center mb-5'>
                                        8<br />Subjects
                                    </h1>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <div className="row mt-6">
                        <div className="col-md-4">
                            <a onClick={() => navigate('/admin/allquiz')} className="tt">
                                <div className="card pt-2 h-[250px] w-[400px] outline outline-1 outline-red-500">
                                    <div className="card-body text-center m-auto">
                                        <div className="">
                                            <img className="img-fluid w-[90px]" alt="Quizzes" src={UserQuiz} />
                                        </div>
                                    </div>
                                    <h1 className='text-4xl font-semibold text-center mb-5'>
                                        8<br />Quizzes
                                    </h1>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='flex mx-14 ml-16'>
                <div className='container cursor-pointer'>
                    <div className="row mt-6" data-bs-toggle="modal" data-bs-target="#AddSubject">
                        <div className="col-md-4">
                            <div className="card pt-2 h-[170px] w-[400px] outline outline-1 outline-red-500">
                                <div className="card-body text-center m-auto">
                                    <div className="">
                                        <img className="img-fluid w-[90px]" alt="Add Subject" src={AddSubject} />
                                    </div>
                                </div>
                                <h1 className='font-semibold text-center mb-[50px]'>Click Here For Add New Subjects</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <div className="row mt-6" data-bs-toggle="modal" data-bs-target="#AddQuiz">
                        <div className="col-md-4">
                            <a href="#" className="tt">
                                <div className="card pt-2 h-[170px] w-[400px] outline outline-1 outline-red-500">
                                    <div className="card-body text-center m-auto">
                                        <div className="">
                                            <img className="img-fluid w-[90px]" alt="Add Quiz" src={AddQuiz} />
                                        </div>
                                    </div>
                                    <h1 className='font-semibold text-center mb-[50px]'>Click Here For Add New Quizzes</h1>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <div className="row mt-6">
                        <div className="col-md-4">
                            <a href="#" className="tt">
                                <div className="card pt-2 h-[170px] w-[400px] outline outline-1 outline-red-500">
                                    <div className="card-body text-center m-auto">
                                        <div className="-mt-5">
                                            <img className="img-fluid w-[140px] -mb-8" alt="Delete Quiz" src={DeleteImage} />
                                        </div>
                                    </div>
                                    <h1 className='font-semibold text-center mb-[80px]'>View Results</h1>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* add subject modal */}
            <div className="modal fade" id="AddSubject" tabIndex="-1" aria-labelledby="AddSubjectLabel" aria-hidden="true">
                <div className="modal-dialog modal-sl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="AddSubjectLabel">Fill Subject Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action="AddSubjects" method="post">
                                <div className="form-group">
                                    <p>Subject ID</p>
                                    <input type="text" className="form-control" name="Subjectid" placeholder="Enter The Subject id" />
                                    <p>Subject Title</p>
                                    <input type="text" className="form-control" name="SubjectTitle" placeholder="Enter The Subject Name" />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">Add Subject</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* end subject modal */}

            {/* add quiz modal */}
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
                                                />
                                            ))}
                                        </div>
                                        <div className="form-group">
                                            <p>Correct Option for Question {qIndex + 1}</p>
                                            <select
                                                className="form-control"
                                                value={q.correctAnswer}
                                                onChange={(e) => handleCorrectOptionChange(qIndex, e.target.value)}
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
            {/* end quiz modal */}
        </>
    );
}

export default AdminPanel;
