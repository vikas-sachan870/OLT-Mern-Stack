import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const SideBar = () => {
    const [subjects, setSubjects] = useState([]); 
    const [topics, setTopics] = useState([]); // Initialize topics as an array
   

    useEffect(() => {
        document.title = 'All Quizzes';
        const fetchSubjects = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:1000/api/v1/quiz/fetch-subject"
                );
                const subjectsData = response.data;
                setSubjects(subjectsData); 
                if (subjectsData.length > 0) {
                    handleSubjectClick(subjectsData[0]);
                }
            } catch (error) {
                console.error("Error fetching subjects:", error);
            }
        };

        fetchSubjects();
    }, []);

    const handleSubjectClick = async (subject) => {
        try {
            const response = await axios.get(
                `http://localhost:1000/api/v1/quiz/fetch-topic/${subject}`
            );
            
            setTopics(response.data); 
            
        } catch (error) {
            console.error("Error fetching topics:", error);
        }
    };

    return (
        <>
            <div className="flex">
                <div className="w-[20%] overflow-y-scroll overflow-x-hidden mt-2">
                    {subjects.map((subject, index) => (
                        <div key={index} className="py-1 px-3 text-lg hover:bg-gray-100">
                            <p className="py-2 px-3 cursor-pointer" onClick={() => handleSubjectClick(subject)}>
                                {subject}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="w-[80%]">
                    {topics.map((topic, index) => (
                        <div key={index} className='m-4  text-xl mt-8 mx-5 rounded-md border border-red-600'>
                            <p className='font-semibold m-4'>{topic.quizTopic}</p>
                            <div className='flex'>
                                <p className='ml-4'><i className='far fa-question-circle text-green-500'></i>No of questions : {topic.questions.length}<i className="fa fa-file-text-o ml-4 text-green-500"></i> Marks : {topic.totalMarks} <i className='far fa-clock text-green-500'></i> Time : {topic.time}</p>
                                <div className='ml-[60%] absolute -mt-7'>
                                    <NavLink to="/start1" state={{ from: `${topic._id}`}} className='border outline outline-1 outline-purple-500 px-2 py-1 rounded-md hover:bg-purple-500 hover:text-white'>Start</NavLink>
                                </div>
                            </div>
                            <div className='bg-red-600 mt-[18px] rounded-b-md px-3 text-lg text-white py-2'>Hindi | English</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SideBar;
