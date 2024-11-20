import React, { useEffect, useRef } from 'react';
import Image from '../image/homeImage.svg';
import Typed from 'typed.js';
import Test1 from '../image/test1.jpg';
import Test2 from '../image/test2.jpg';
import Test3 from '../image/test3.jpg';
import Gif from '../image/fast-forward.gif';
import NavBar from './NavBar';

const Home = () => {

  useEffect(() => {
    document.title = 'Home';
  }, []);

  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Please Login", "To See More Content", "Thank You", "For Visiting Our Website"],
      startDelay: 200,
      typeSpeed: 120,
      backSpeed: 20,
      backDelay: 100,
      loop: true
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <>
      <NavBar />
      <div className='flex flex-col md:flex-row mt-24 justify-center items-center'>
        {/* first */}
        <div className='mx-4 md:mx-40 mt-16 px-4 md:px-10 text-center md:text-left'>
          <h1 className='text-xl md:text-3xl'>Hi User!</h1>
          <h1 className='text-xl md:text-3xl'>Welcome to Online Learning</h1>
          <h1 className='text-xl md:text-3xl'><span className='font-serif' ref={el}></span></h1>
        </div>
        {/* second */}
        <div className='w-64 md:w-96 mx-4 md:mx-20 mt-8 md:mt-0'>
          <img className='' src={Image} alt="Error" />
        </div>
      </div>

      {/* test images */}
      <div className='flex flex-col md:flex-row justify-between ml-4 md:ml-20 my-16'>
        <div className='m-auto mb-8 md:mb-0'>
          <img className='rounded-full w-full md:w-[500px] h-[250px]' src={Test1} alt="" />
          <div>
            <p className="flex font-semibold ml-2 md:ml-6 py-4">Live Tests
              for Real Exam <br /> Experience</p>
            <p className='flex ml-2 md:ml-6'>Feel the thrill of a real exam.
              Improve your time & <br />pressure management skills</p>
          </div>
        </div>

        <div className='md:ml-64 mb-8 md:mb-0'>
          <img className='rounded-full w-full md:w-[250px] h-[250px]' src={Test2} alt="" />
          <div>
            <p className="flex font-semibold ml-2 md:ml-6 mt-4">Detailed
              Score Analysis</p>
            <p className='flex w-full md:w-1/2 ml-2 md:ml-6'>Get a detailed breakdown of your
              strengths & weaknesses and discover insights to improve your score</p>
          </div>
        </div>
        <div className='md:ml-32'>
          <img className='rounded-full w-full md:w-[250px] h-[250px]' src={Test3} alt="" />
          <div className=''>
            <p className="flex font-semibold ml-2 md:ml-6 mt-4">Learn from
              the Best</p>
            <p className='flex w-full md:w-1/2 ml-2 md:ml-6'>Learn from the best material of the
              subject, in the most engaging yet simplified ways</p>
          </div>
        </div>
      </div>

      <div>
        <p className='font-bold text-2xl md:text-3xl text-center pb-6'>One Destination for Complete Exam Preparation</p>
      </div>
      <div>
        <div className='flex flex-col items-center'>
          <p className='text-xl md:text-2xl flex pb-8'>Learn <img className='w-[25px] h-[20px] mt-2 mx-1' src={Gif} alt="" /> Practice <img className='w-[25px] h-[20px] mt-2 mx-1' src={Gif} alt="" /> Improve <img className='w-[25px] h-[20px] mt-2 mx-1' src={Gif} alt="" /> Succeed </p>
        </div>
      </div>

      {/* footer */}
      <div className='bg-black text-white py-4'>
        <p className='text-center'>Copyright <i className="fa-regular fa-copyright"></i> 2023 : OLT Website</p>
      </div>
    </>
  );
}

export default Home;
