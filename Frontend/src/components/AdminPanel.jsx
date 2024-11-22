import { useEffect, useState } from 'react';
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

    const totaluser=axios.get("https://olt-mern-stack-1.onrender.com/api/v1/nofuser");

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
        axios.post("https://olt-mern-stack-1.onrender.com/api/v1/quiz/createquiz", quizDetails)
            .then(result => {
                console.log(result);
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <NavBar />
            <div className='mx-14 ml-16 pt-4'>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    <div className="col-span-1">
                        <a onClick={() => navigate('/admin/alluser')} className="tt">
                            <div className="card pt-2 h-[250px] w-full outline outline-1 outline-red-500">
                                <div className="card-body text-center m-auto">
                                    <div className="">
                                        <img className="img-fluid w-[90px]" alt="Users" src={UserImage} />
                                    </div>
                                </div>
                                <h1 className='text-4xl font-semibold text-center mb-5'>
                                    {totaluser}<br />Total Users
                                </h1>
                            </div>
                        </a>
                    </div>

                    <div className="col-span-1">
                        <a href="#" className="tt">
                            <div className="card pt-2 h-[250px] w-full outline outline-1 outline-red-500">
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

                    <div className="col-span-1">
                        <a onClick={() => navigate('/admin/allquiz')} className="tt">
                            <div className="card pt-2 h-[250px] w-full outline outline-1 outline-red-500">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-6">
                    <div className="col-span-1 cursor-pointer" data-bs-toggle="modal" data-bs-target="#AddSubject">
                        <div className="card pt-2 h-[170px] w-full outline outline-1 outline-red-500">
                            <div className="card-body text-center m-auto">
                                <div className="">
                                    <img className="img-fluid w-[90px]" alt="Add Subject" src={AddSubject} />
                                </div>
                            </div>
                            <h1 className='font-semibold text-center mb-[50px]'>Click Here For Add New Subjects</h1>
                        </div>
                    </div>

                    <div className="col-span-1 cursor-pointer" data-bs-toggle="modal" data-bs-target="#AddQuiz">
                        <div className="card pt-2 h-[170px] w-full outline outline-1 outline-red-500">
                            <div className="card-body text-center m-auto">
                                <div className="">
                                    <img className="img-fluid w-[90px]" alt="Add Quiz" src={AddQuiz} />
                                </div>
                            </div>
                            <h1 className='font-semibold text-center mb-[50px]'>Click Here For Add New Quizzes</h1>
                        </div>
                    </div>

                    <div className="col-span-1 cursor-pointer">
                        <div className="card pt-2 h-[170px] w-full outline outline-1 outline-red-500">
                            <div className="card-body text-center m-auto">
                                <div className="-mt-5">
                                    <img className="img-fluid w-[140px] -mb-8" alt="Delete Quiz" src={DeleteImage} />
                                </div>
                            </div>
                            <h1 className='font-semibold text-center mb-[80px]'>View Results</h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Subject Modal */}
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
            {/* End Subject Modal */}

            {/* Add Quiz Modal */}
            <div className="modal fade" id="AddQuiz" tabIndex="-1" aria-labelledby="AddQuizLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="AddQuizLabel">Add Quiz</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <input type="text" className="form-control mb-2" value={subjectName} onChange={(e) => setSubjectName(e.target.value)} placeholder="Enter Subject Name" />
                                    <input type="text" className="form-control mb-2" value={quizTopic} onChange={(e) => setQuizTopic(e.target.value)} placeholder="Enter Quiz Topic" />
                                    <input type="text" className="form-control mb-2" value={time} onChange={(e) => setTime(e.target.value)} placeholder="Enter Time" />
                                    <input type="text" className="form-control mb-2" value={totalMarks} onChange={(e) => setTotalMarks(e.target.value)} placeholder="Enter Total Marks" />
                                    <input type="number" className="form-control mb-2" value={numQuestions} onChange={handleNumQuestionsChange} placeholder="Number of Questions" />
                                </div>
                                {questions.map((question, index) => (
                                    <div key={index} className="form-group mb-3">
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            value={question.questionText}
                                            onChange={(e) => handleQuestionChange(index, e.target.value)}
                                            placeholder={`Enter Question ${index + 1}`}
                                        />
                                        {question.options.map((option, oIndex) => (
                                            <input
                                                key={oIndex}
                                                type="text"
                                                className="form-control mb-2"
                                                value={option.optionText}
                                                onChange={(e) => handleOptionChange(index, oIndex, e.target.value)}
                                                placeholder={`Option ${oIndex + 1}`}
                                            />
                                        ))}
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            value={question.correctAnswer}
                                            onChange={(e) => handleCorrectOptionChange(index, e.target.value)}
                                            placeholder="Correct Answer"
                                        />
                                    </div>
                                ))}
                                <button type="submit" className="btn btn-primary w-full">Submit Quiz</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Add Quiz Modal */}
        </>
    );
};

export default AdminPanel;
