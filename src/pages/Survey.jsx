import React, { useState, useEffect } from 'react';
import { questions } from '../utils/questions';
import SurveyForm from '../components/SurveyForm';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/storage';
import { useNavigate } from 'react-router-dom';


const Survey = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [sessionId, setSessionId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Generate a new session ID each time the survey starts
    const newSessionId = Date.now();
    setSessionId(newSessionId);
    
    // Retrieve existing sessions or initialize as an empty array
    const existingSessions = getFromLocalStorage('all_sessions') || [];

    // Check if the new session ID already exists to avoid duplication
    if (!existingSessions.includes(newSessionId)) {
      // Create a new array instead of mutating the existing one directly
      const updatedSessions = [...existingSessions, newSessionId];

      // Save updated sessions array to Local Storage
      saveToLocalStorage('all_sessions', updatedSessions);
    }
  }, []);

  const handleAnswer = (questionId, answer) => {
    const updatedAnswers = { ...answers, [questionId]: answer };
    setAnswers(updatedAnswers);

    // Save answers with the session ID
    saveToLocalStorage(`answers_${sessionId}`, updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex === questions.length - 1) {
      const isConfirmed = window.confirm('Do you want to submit the survey?');
      if (isConfirmed) {
        // Mark the survey as completed for the current session
        saveToLocalStorage(`survey_status_${sessionId}`, 'COMPLETED');
        navigate('/thank-you');
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
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
      <div className="box bg-white w-full max-w-4xl p-10 mx-4 rounded-lg">
        <h2 className='text-center mb-6'>
          Question {currentQuestionIndex + 1} of {questions.length}
        </h2>
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
