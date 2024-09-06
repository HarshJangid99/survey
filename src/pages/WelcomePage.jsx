import React from 'react';
import { useNavigate } from 'react-router-dom';
import rocket from '../assets/rocket.jpg';

const WelcomePage = () => {
  const navigate = useNavigate();

  const startSurvey = () => {
    navigate('/survey');
    window.localStorage.clear()
  };

  return (
    <div className='flex items-center justify-center h-screen w-screen bg-black p-4'>
      <div className="w-full max-w-md h-auto bg-white flex flex-col justify-between rounded-lg p-6 space-y-4">
        <div className='flex justify-center'>
          <img src={rocket} alt="Rocket" className='w-32 h-32 rounded-full object-cover' />
        </div>
        <h1 className='font-bold text-center text-2xl sm:text-3xl'>Welcome to Our Survey</h1>
        <p className='font-medium text-center text-gray-600 text-base sm:text-lg'>
          Let's start with a quick survey
        </p>
        <button 
          onClick={startSurvey} 
          className='w-full p-4 bg-green-500 text-white hover:bg-green-400 font-semibold rounded-lg'
        >
          Start Survey
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
