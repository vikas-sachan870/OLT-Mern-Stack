import React, { useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

const Second = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("loggedin")) {
            navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        document.title = 'Second Semester';
    }, []);

    const materials = [
        {
            title: 'Automata',
            desc: 'Introduction to the theory of computation',
            descSub: '(Michael Sipser)',
            edition: '3rd Edition',
            image: Auto,
            pdf: AutoPdf,
        },
        {
            title: 'Java',
            desc: 'Object-Oriented programming using Java',
            descSub: '(Simon Kendal)',
            edition: '1st Edition',
            image: Java,
            pdf: JavaPdf,
        },
        {
            title: 'DSA',
            desc: 'Data structure and algorithm using C',
            descSub: '(Cormen T. H., Leiserson C. E., Rivest R. L.)',
            edition: '3rd Edition',
            image: Dsa,
            pdf: DsaPdf,
        },
        {
            title: 'DBMS',
            desc: 'Database Management System',
            descSub: '(Korth, Silbertz & Sudarshan)',
            edition: '7th Edition',
            image: Dbms,
            pdf: DbmsPdf,
        },
        {
            title: 'O.S.',
            desc: 'Operating system',
            descSub: '(Silberschatz, Galvin and Gagne)',
            edition: '6th Edition',
            image: Os,
            pdf: OsPdf,
        },
    ];

    return (
        <>
            <NavBar />
            <div className='flex flex-wrap justify-center mt-10'>
                {materials.map((material, index) => (
                    <div key={index} className='w-[350px] border border-gray-400 rounded-lg m-4'>
                        <img className='w-full h-[300px] rounded-t-lg' src={material.image} alt={material.title} />
                        <div className='h-48 text-center bg-gray-200 rounded-b-lg'>
                            <p className='font-semibold text-xl py-2'>{material.title}</p>
                            <p>{material.desc}</p>
                            <p className='font-bold'>{material.descSub}</p>
                            <p className='font-semibold'>{material.edition}</p>
                            <div className='mt-4'>
                                <a 
                                    href={material.pdf} 
                                    download={material.title} 
                                    className='px-2 py-2 text-lg rounded-md border outline outline-1 outline-purple-500 hover:bg-purple-500 hover:text-white'
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
}

export default Second;
