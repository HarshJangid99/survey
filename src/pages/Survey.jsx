import React, { useState, useEffect } from 'react';
import { questions } from '../utils/questions';
import SurveyForm from '../components/SurveyForm';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/storage';
import { useNavigate } from 'react-router-dom';

const Survey = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [sessionId] = useState(Date.now()); 
  const navigate = useNavigate();

  useEffect(() => {

    const savedAnswers = getFromLocalStorage('answers');
    if (savedAnswers) {
      setAnswers(savedAnswers);
    }
  }, []);

  const handleAnswer = (questionId, answer) => {
    const updatedAnswers = { ...answers, [questionId]: answer };
    setAnswers(updatedAnswers);
    saveToLocalStorage('answers', updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex === questions.length - 1) {
  
      const isConfirmed = window.confirm('Do you want to submit the survey?');
      if (isConfirmed) {
       
        saveToLocalStorage('survey_status', 'COMPLETED');
        navigate('/thank-you');
      }
    } else {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion.id] || '';

  return (
    <div className='w-full h-screen flex justify-center items-center bg-black overflow-auto'>
      <div className="box bg-white w-full max-w-4xl p-10 mx-4 rounded-lg" >
        <h2 className='text-center mb-6'>Question {currentQuestionIndex + 1} of {questions.length}</h2>
        <SurveyForm
          question={currentQuestion}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onSkip={handleSkip}
          currentAnswer={currentAnswer}
          currentQuestionIndex={currentQuestionIndex}
        />
      </div>
    </div>
  );
};

export default Survey;
