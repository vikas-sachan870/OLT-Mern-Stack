import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

// Import images and PDFs
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

const Third = () => {
    const navigate = useNavigate();

    // Redirect if not logged in
    useEffect(() => {
        if (!localStorage.getItem("loggedin")) {
            navigate('/');
        }
    }, [navigate]);

    // Set document title
    useEffect(() => {
        document.title = 'Third Semester';
    }, []);

    // Books data
    const subjects = [
        {
            title: 'A.I.',
            desc: 'Artificial Intelligence',
            descSub1: '(Rich E. & Knight K.)',
            edition: '3rd Edition',
            img: Ai,
            pdf: AiPdf,
            downloadName: 'Artificial Intelligence',
        },
        {
            title: 'Software Engineering',
            desc: 'Software Engineering',
            descSub1: '(R S Pressman)',
            edition: '7th Edition',
            img: Se,
            pdf: SePdf,
            downloadName: 'Software Engineering',
        },
        {
            title: 'Software Project Management',
            desc: 'Software project management',
            descSub1: '(Bob Hughes and Mike Cotterell)',
            edition: '5th Edition',
            img: Spm,
            pdf: SpmPdf,
            downloadName: 'Software Project Management',
        },
        {
            title: 'Web Development',
            desc: 'Web technology & Design',
            descSub1: '(C Xavier)',
            edition: '1st Edition',
            img: Web,
            pdf: WebPdf,
            downloadName: 'Web Development',
        },
        {
            title: 'Computer Network',
            desc: 'Data communications & Networking',
            descSub1: '(Behrouz A. Forouzan)',
            edition: '4th Edition',
            img: Cn,
            pdf: CnPdf,
            downloadName: 'Computer Networks',
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
                            src={subject.img}
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

export default Third;
