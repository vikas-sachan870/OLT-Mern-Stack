import  { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

import Auto from '../image/autometa.jpg';
import Java from '../image/Oops.jpg';
import Dsa from '../image/dsa.jpeg';
import Dbms from '../image/dbms.jpg';
import Os from '../image/os.jpg';

import AutoPdf from '../pdf/Automata.pdf';
import JavaPdf from '../pdf/Java.pdf';
import DsaPdf from '../pdf/Data_structure.pdf';
import DbmsPdf from '../pdf/dbms.pdf';
import OsPdf from '../pdf/os.pdf';

const Second = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('loggedin')) {
            navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        document.title = 'Second Semester';
    }, []);

    const subjects = [
        {
            image: Auto,
            title: 'Automata',
            desc: 'Introduction to the theory of computation',
            descSub1: '(Michael Sipser)',
            edition: '3rd Edition',
            pdf: AutoPdf,
        },
        {
            image: Java,
            title: 'Java',
            desc: 'Object-Oriented programming using java',
            descSub1: '(Simon Kendal)',
            edition: '1st Edition',
            pdf: JavaPdf,
        },
        {
            image: Dsa,
            title: 'DSA',
            desc: 'Data structure and algorithm using C',
            descSub1: '(Cormen T. H., Rivest R. L.)',
            edition: '3rd Edition',
            pdf: DsaPdf,
        },
        {
            image: Dbms,
            title: 'DBMS',
            desc: 'Database Management System',
            descSub1: '(Korth, Silbertz & Sudarshan)',
            edition: '7th Edition',
            pdf: DbmsPdf,
        },
        {
            image: Os,
            title: 'O.S.',
            desc: 'Operating System',
            descSub1: '(Silberschatz, Galvin and Gagne)',
            edition: '6th Edition',
            pdf: OsPdf,
        },
    ];

    return (
        <>
            <NavBar />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8">
                {subjects.map((subject, index) => (
                    <div key={index} className="w-full max-w-[300px] mx-auto border border-gray-300 rounded-lg shadow-md">
                        <img
                            className="w-full h-[250px] object-fit rounded-t-lg"
                            src={subject.image}
                            alt={subject.title}
                        />
                        <div className="h-48 text-center bg-gray-200 rounded-b-lg ">
                            <p className="font-bold text-xl mb-2">{subject.title}</p>
                            <p>{subject.desc}</p>
                            <p className="font-bold">{subject.descSub1}</p>
                            <p className="font-semibold">{subject.edition}</p>
                            <div className="mt-4">
                                <a
                                    href={subject.pdf}
                                    download={subject.title}
                                    className="px-4 py-2 text-lg rounded-md border outline outline-1 outline-purple-500 hover:bg-purple-500 hover:text-white"
                                >
                                    Download
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Second;