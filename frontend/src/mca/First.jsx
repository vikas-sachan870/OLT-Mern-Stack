import React, { useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

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

  const materials = [
    {
      title: 'Discreate Mathematics',
      desc: 'Discreate Mathematics and its Applications',
      descSub: '(Kenneth H. Rosen)',
      edition: '7th Edition',
      image: Discreate,
      pdf: DiscPdf,
      downloadText: 'Download'
    },
    {
      title: 'C.O.A.',
      desc: 'Computer Organization and Architecture',
      descSub: '(Dr. Prakash Mahanwar)',
      edition: '2nd Edition',
      image: Coa,
      pdf: CoaPdf,
      downloadText: 'Download'
    },
    {
      title: 'F.O.C.',
      desc: 'Fundamental of Computers',
      descSub: '(E Balagurusamy)',
      edition: '1st Edition',
      image: Foc,
      pdf: FocPdf,
      downloadText: 'Download'
    },
    {
      title: 'C Language',
      desc: 'Basics of C programming language',
      descSub: '(Schildt H)',
      edition: '4th Edition',
      image: C,
      pdf: ClanPdf,
      downloadText: 'Download'
    },
    {
      title: 'Principle Of Management',
      desc: 'Principle of management',
      descSub: '(P.C. Tripathi & P.N. Reddy)',
      edition: '5th Edition',
      image: Pom,
      pdf: PomPdf,
      downloadText: 'Download'
    }
  ];

  return (
    <>
      <NavBar />
      <div className='flex flex-wrap justify-center mt-10'>
        {materials.map((material, index) => (
          <div key={index} className='w-[350px] m-4'>
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

export default First;
