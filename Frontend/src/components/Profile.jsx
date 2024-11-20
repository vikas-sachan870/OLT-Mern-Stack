import { useEffect } from 'react';
import DriveImage from '../image/driveImage.jpeg';
import McaImage from '../image/mca_image.jpeg';
import BtechImage from '../image/btech_image.jpg';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const Profile = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("loggedin")) {
            navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        document.title = 'Profile';
    }, []);

    const quizData = [
        {
            title: 'Drive Quiz',
            description: 'These quizzes are beneficial for you, so please give them a try to improve yourself.',
            button: 'Click here',
            image: DriveImage,
            link: '/quizmain',
        },
        {
            title: 'MCA Books',
            description: "All semesters' books of MCA are available here. Click here to download.",
            button: 'Click here',
            image: McaImage,
            link: '/semesters',
        },
        {
            title: 'Btech Books',
            description: "All semesters' books of BTech are available here. Click here to download.",
            button: 'Click here',
            image: BtechImage,
            link: '/',
        },
    ];

    return (
        <>
            <NavBar />
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-4 mt-10 bg-white'>
                {quizData.map((quiz, index) => (
                    <div key={index} className='bg-white shadow-lg rounded-lg'>
                        <img className='w-full h-[210px] rounded-t-lg' src={quiz.image} alt={quiz.title} />
                        <div className='p-4 text-center bg-gray-200 rounded-b-lg'>
                            <p className='font-semibold text-xl py-2'>{quiz.title}</p>
                            <p>{quiz.description}</p>
                            <div className='mt-4'>
                                <NavLink to={quiz.link} className='px-2 py-2 text-lg rounded-md border outline outline-1 outline-purple-500 hover:bg-purple-500 hover:text-white'>
                                    {quiz.button}
                                </NavLink>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Profile;