import React, { useEffect } from 'react';
import MCABooks from '../image/MCA_Books.png';
import { NavLink, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

const Semesters = () => {
    const navigate = useNavigate();
    useEffect(()=>{if (!localStorage.getItem("loggedin")){{navigate('/')};}})

    useEffect(() => {
        document.title = 'Semesters';
    }, []);

    const materials = [
        {
            title: 'First Semester',
            description: 'Click here to download first semester books pdf',
            buttonLabel: 'Click here',
            path: '/first',
        },
        {
            title: 'Second Semester',
            description: 'Click here to download second semester books pdf',
            buttonLabel: 'Click here',
            path: '/second',
        },
        {
            title: 'Third Semester',
            description: 'Click here to download third semester books pdf',
            buttonLabel: 'Click here',
            path: '/third',
        },
        {
            title: 'Fourth Semester',
            description: 'Click here to download fourth semester books pdf',
            buttonLabel: 'Click here',
            path: '/fourth',
        },
    ];

    return (
        <>
        <NavBar />
        <div className='flex flex-wrap justify-center mt-10'>
            {materials.map((material, index) => (
                <div key={index} className='w-[300px] border border-gray-400 rounded-lg m-4'>
                    <img className='w-full h-[250px] rounded-t-lg' src={MCABooks} alt={material.title} />
                    <div className='h-40 text-center bg-gray-200 rounded-b-lg'>
                        <p className='font-semibold text-xl py-2'>{material.title}</p>
                        <p>{material.desc}</p>
                        <p className=''>{material.description}</p>
                    
                        <div className='mt-4'>
                            <NavLink
                                to={material.path} 
                                className='px-2 py-2 text-lg rounded-md border outline outline-1 outline-purple-500 hover:bg-purple-500 hover:text-white'
                            >
                                Click Here
                            </NavLink>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </>
    );
}

export default Semesters;
