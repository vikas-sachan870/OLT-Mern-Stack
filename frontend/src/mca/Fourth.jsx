import React, { useEffect } from 'react';
import Dds from '../image/dds.jpg';
import Mc from '../image/mc.png';
import Sqa from '../image/sqa.png';
import DdsPdf from '../pdf/dds.pdf';
import McPdf from '../pdf/mobile_computing.pdf';
import SqaPdf from '../pdf/sqa.pdf';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

const Fourth = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("loggedin")) {
            navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        document.title = 'Fourth Semester';
    }, []);

    const materials = [
        {
            title: 'Distributed Database Systems',
            desc: 'Distributed Database Systems',
            descSub: '(Silberschatz, Korth & Sudarshan)',
            edition: '4th Edition',
            image: Dds,
            pdf: DdsPdf,
            downloadText: 'Download',
        },
        {
            title: 'Mobile Computing',
            desc: 'Mobile Computing',
            descSub: '(Jochen Schiller)',
            edition: '2nd Edition',
            image: Mc,
            pdf: McPdf,
            downloadText: 'Download',
        },
        {
            title: 'S.Q.A.',
            desc: 'Software Quality Assurance',
            descSub: '(Daniel Galin)',
            edition: '4th Edition',
            image: Sqa,
            pdf: SqaPdf,
            downloadText: 'Download',
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
                                    {material.downloadText}
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Fourth;
