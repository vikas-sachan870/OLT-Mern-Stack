import { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Dds from '../image/dds.jpg';
import Mc from '../image/mc.png';
import Sqa from '../image/sqa.png';
import DdsPdf from '../pdf/dds.pdf';
import McPdf from '../pdf/mobile_computing.pdf';
import SqaPdf from '../pdf/sqa.pdf';

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

  const subjects = [
    {
      id: 1,
      title: 'Distributed Database Systems',
      desc: 'Distributed Database Systems',
      descSub1: '(Silberschatz, Korth & Sudarshan)',
      edition: '4th Edition',
      image: Dds,
      pdf: DdsPdf,
    },
    {
      id: 2,
      title: 'Mobile Computing',
      desc: 'Mobile Computing',
      descSub1: '(Jochen Schiller)',
      edition: '2nd Edition',
      image: Mc,
      pdf: McPdf,
    },
    {
      id: 3,
      title: 'S.Q.A.',
      desc: 'Software Quality Assurance',
      descSub1: '(Daniel Galin)',
      edition: '4th Edition',
      image: Sqa,
      pdf: SqaPdf,
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

export default Fourth;