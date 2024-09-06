
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Thankyou = () => {
  const navigate = useNavigate();

  useEffect(() => {

    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);


    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className='w-full h-screen flex justify-center items-center bg-black overflow-auto'>
      <div className="box bg-white w-full max-w-4xl p-10 mx-4 text-center">
        <h2 className='text-2xl mb-4'>Thank you for completing the survey!</h2>
        <p>We appreciate your time and feedback.</p>
      </div>
    </div>
  );
};

export default Thankyou;
