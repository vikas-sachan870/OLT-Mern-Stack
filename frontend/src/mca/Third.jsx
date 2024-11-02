import React, { useEffect } from 'react';
import Ai from '../image/ai.jpg';
import Se from '../image/se.jpg';
import Spm from '../image/spm.jpg';
import Web from '../image/web.jpg';
import Cn from '../image/cn.jpg';
import AiPdf from '../pdf/ai.pdf';
import SePdf from '../pdf/se.pdf';
import SpmPdf from '../pdf/spm.pdf';
import WebPdf from '../pdf/web_development.pdf';
import CnPdf from '../pdf/cn.pdf';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

const Third = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("loggedin")) {
            navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        document.title = 'Third Semester';
    }, []);

    const materials= [
        {
            title: 'A.I.',
            desc: 'Artificial Intelligence',
            descSub1: '(Rich E. & Knight K.)',
            edition: '3rd Edition',
            image: Ai,
            pdf: AiPdf,
        },
        {
            title: 'Software Engineering',
            desc: 'Software Engineering',
            descSub1: '(R S Pressman)',
            edition: '7th Edition',
            image: Se,
            pdf: SePdf,
        },
        {
            title: 'Software Project Management',
            desc: 'Software project management',
            descSub1: '(Bob Hughes and Mike Cotterell)',
            edition: '5th Edition',
            image: Spm,
            pdf: SpmPdf,
        },
        {
            title: 'Web Development',
            desc: 'Web technology & Design',
            descSub1: '(C Xavier)',
            edition: '1st Edition',
            image: Web,
            pdf: WebPdf,
        },
        {
            title: 'Computer Network',
            desc: 'Data communications & Networking',
            descSub1: '(Behrouz A. Forouzan)',
            edition: '4th Edition',
            image: Cn,
            pdf: CnPdf,
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
                            <p className='font-bold'>{material.descSub1}</p>
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
};

export default Third;
