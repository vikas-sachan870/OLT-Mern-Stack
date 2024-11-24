import { useEffect, useRef } from 'react';
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
      strings: [
        "Please Login",
        "To See More Content",
        "Thank You",
        "For Visiting Our Website",
      ],
      startDelay: 200,
      typeSpeed: 120,
      backSpeed: 20,
      backDelay: 100,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <>
      <NavBar />
      <div className="flex flex-col md:flex-row mt-20 justify-center items-center gap-8">
        {/* Text Section */}
        <div className="text-center md:text-left px-6 md:px-12">
          <h1 className="text-2xl md:text-4xl font-semibold">Hi User!</h1>
          <h2 className="text-2xl md:text-4xl font-semibold">Welcome to Online Learning</h2>
          <h3 className="text-xl md:text-3xl font-serif mt-2">
            <span ref={el}></span>
          </h3>
        </div>

        {/* Image Section */}
        <div className="w-64 md:w-96">
          <img src={Image} alt="Welcome" />
        </div>
      </div>

      {/* Test Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-20 my-16">
        {/* Feature 1 */}
        <div className="flex flex-col items-center text-center">
          <img
            className="rounded-full  h-[250px]"
            src={Test1}
            alt="Live Tests"
          />
          <p className="text-xl font-bold mt-4">Live Tests for Real Exam Experience</p>
          <p className="text-sm md:text-base mt-2">
            Feel the thrill of a real exam. Improve your time & pressure management skills.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center text-center">
          <img
            className="rounded-full w-[250px] h-[250px]"
            src={Test2}
            alt="Score Analysis"
          />
          <p className="text-xl font-bold mt-4">Detailed Score Analysis</p>
          <p className="text-sm md:text-base mt-2">
            Get a detailed breakdown of your strengths & weaknesses and discover insights to improve your score.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center text-center">
          <img
            className="rounded-full w-[250px] h-[250px]"
            src={Test3}
            alt="Learn from Best"
          />
          <p className="text-xl font-bold mt-4">Learn from the Best</p>
          <p className="text-sm md:text-base mt-2">
            Learn from the best material of the subject in the most engaging yet simplified ways.
          </p>
        </div>
      </div>

      {/* Slogan Section */}
      <div className="text-center">
        <p className="text-2xl md:text-3xl font-bold pb-6">
          One Destination for Complete Exam Preparation
        </p>
        <div className="flex justify-center items-center text-xl md:text-2xl">
          <span>Learn</span>
          <img
            className="w-[25px] h-[20px] mx-1"
            src={Gif}
            alt="fast-forward"
          />
          <span>Practice</span>
          <img
            className="w-[25px] h-[20px] mx-1"
            src={Gif}
            alt="fast-forward"
          />
          <span>Improve</span>
          <img
            className="w-[25px] h-[20px] mx-1"
            src={Gif}
            alt="fast-forward"
          />
          <span>Succeed</span>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-4 text-center">
        <p>
          Copyright &copy; 2023 : OLT Website
        </p>
      </footer>
    </>
  );
};

export default Home;
