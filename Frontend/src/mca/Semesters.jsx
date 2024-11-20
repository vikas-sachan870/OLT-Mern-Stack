import { useEffect} from 'react';
import MCABooks from '../image/MCA_Books.png';
import { NavLink, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

const Semesters = () => {
    const navigate = useNavigate();

    // Redirect to home if not logged in
    useEffect(() => {
        if (!localStorage.getItem("loggedin")) {
            navigate('/');
        }
    }, [navigate]);

    // Set document title
    useEffect(() => {
        document.title = 'Semesters';
    }, []);

    // Semester data
    const semesters = [
        {
            title: 'First semester',
            desc: 'Click here to download first semester books pdf',
            link: '/first'
        },
        {
            title: 'Second semester',
            desc: 'Click here to download second semester books pdf',
            link: '/second'
        },
        {
            title: 'Third semester',
            desc: 'Click here to download third semester books pdf',
            link: '/third'
        },
        {
            title: 'Fourth semester',
            desc: 'Click here to download fourth semester books pdf',
            link: '/fourth'
        }
    ];

    return (
        <>
            <NavBar />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-8">
                {semesters.map((semester, index) => (
                    <div key={index} className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <img className="w-full h-[250px] object-cover" src={MCABooks} alt="Semester books" />
                        <div className="p-4 text-center bg-gray-200">
                            <p className="font-semibold text-xl mb-2">{semester.title}</p>
                            <p className="mb-4">{semester.desc}</p>
                            <NavLink 
                                to={semester.link} 
                                className="px-4 py-2 text-lg rounded-md border outline outline-1 outline-purple-500 hover:bg-purple-500 hover:text-white"
                            >
                                Click here
                            </NavLink>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Semesters;