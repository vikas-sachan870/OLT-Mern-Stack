import React, { useEffect, useState } from 'react';
import DriveImage from '../image/driveImage.jpeg';
import McaImage from '../image/mca_image.jpeg';
import BtechImage from '../image/btech_image.jpg';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const Profile = () => {
    const navigate = useNavigate();
    useEffect(()=>{if (!localStorage.getItem("loggedin")){{navigate('/')};}})
  useEffect(() => {
    document.title = 'Profile';
  }, []);

  const quizzes = [
    {
      title: 'Drive Quiz',
      description: 'These quizzes are beneficial for you, so please take them to improve yourself.',
      image: DriveImage,
      buttonText: 'Click here',
      link: '/quizmain'
    },
    {
      title: 'MCA Books',
      description: "All semesters' books of MCA are available here, click to download.",
      image: McaImage,
      buttonText: 'Click here',
      link: '/semesters'
    },
    {
      title: 'Btech Books',
      description: "All semesters' books of BTech are available here, click to download.",
      image: BtechImage,
      buttonText: 'Click here',
      link: '/'
    }
  ];

  return (
    <>
      <NavBar />
      <div className="mx-auto max-w-screen-xl px-4 py-8">
       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img className="w-full h-[210px] rounded-t-lg" src={quiz.image} alt={quiz.title} />
              <div className="p-4 bg-gray-200">
                <h3 className="font-semibold text-xl mb-2 text-center">{quiz.title}</h3>
                <p className="mb-4">{quiz.description}</p>
                <NavLink 
                  to={quiz.link} 
                  className="px-2 block text-center py-2 text-lg rounded-md border outline outline-1 outline-purple-500 hover:bg-purple-500 hover:text-white "
                >
                  {quiz.buttonText}
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
