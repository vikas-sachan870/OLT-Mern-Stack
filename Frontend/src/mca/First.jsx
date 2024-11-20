import { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Discreate from '../image/discreate.jpg';
import Coa from '../image/coa.jpeg';
import Foc from '../image/foc.jpg';
import C from '../image/c_lan.webp';
import Pom from '../image/pom.jpg';
import DiscPdf from '../pdf/Rosen.pdf';
import CoaPdf from '../pdf/COA_Full.pdf';
import FocPdf from '../pdf/Foc.pdf';
import ClanPdf from '../pdf/c_language.pdf';
import PomPdf from '../pdf/Pom.pdf';

const First = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("loggedin")) {
            navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        document.title = 'First Semester';
    }, []);

    const subjects = [
        {
            title: 'Discrete Mathematics',
            desc: 'Discrete Mathematics and its Applications',
            descSub1: '(Kenneth H. Rosen)',
            edition: '7th Edition',
            img: Discreate,
            pdf: DiscPdf,
            pdfName: 'Discrete Mathematics',
        },
        {
            title: 'C.O.A.',
            desc: 'Computer Organization and Architecture',
            descSub1: '(Dr. Prakash Mahanwar)',
            edition: '2nd Edition',
            img: Coa,
            pdf: CoaPdf,
            pdfName: 'Computer Organization and Architecture',
        },
        {
            title: 'F.O.C.',
            desc: 'Fundamentals of Computers',
            descSub1: '(E Balagurusamy)',
            edition: '1st Edition',
            img: Foc,
            pdf: FocPdf,
            pdfName: 'Fundamentals of Computers',
        },
        {
            title: 'C Language',
            desc: 'Basics of C programming language',
            descSub1: '(Schildt H)',
            edition: '4th Edition',
            img: C,
            pdf: ClanPdf,
            pdfName: 'C Language',
        },
        {
            title: 'Principles of Management',
            desc: 'Principles of Management',
            descSub1: '(P.C. Tripathi & P.N. Reddy)',
            edition: '5th Edition',
            img: Pom,
            pdf: PomPdf,
            pdfName: 'Principles of Management',
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

export default First;