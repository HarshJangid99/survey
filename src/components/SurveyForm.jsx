import React from 'react';

const SurveyForm = ({ question, onAnswer, onNext, onPrevious, onSkip, currentAnswer }) => {
  const handleRatingClick = (rating) => {
    onAnswer(question.id, rating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  const isFourthQuestion = question.id === 'q4';

  return (
    <form onSubmit={handleSubmit} className='w-full'>
      <div className='mt-4 text-center flex flex-col space-y-9'>
        <h3 className='text-2xl'>{question.text}</h3>

        {question.type === 'rating' && !isFourthQuestion && (
          <div className='flex justify-center gap-3 flex-wrap'>
            {[1, 2, 3, 4, 5].map((rating) => (
              <div
                key={rating}
                className={`py-4 px-6 rounded-full cursor-pointer ${
                  currentAnswer === rating ? 'bg-red-600 text-white' : 'bg-blue-700 text-white'
                }`}
                onClick={() => handleRatingClick(rating)}
              >
                {rating}
              </div>
            ))}
          </div>
        )}

        {isFourthQuestion && (
          <div className='flex justify-center gap-1 flex-wrap'>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
              <div
                key={rating}
                className={`py-2 px-3 rounded-full cursor-pointer ${
                  currentAnswer === rating ? 'bg-red-600 text-white' : 'bg-blue-700 text-white'
                }`}
                onClick={() => handleRatingClick(rating)}
              >
                {rating}
              </div>
            ))}
          </div>
        )}

        {question.type === 'text' && (
          <textarea
            value={currentAnswer}
            onChange={(e) => onAnswer(question.id, e.target.value)}
            required
            className='border-2 border-black w-full p-2'
          />
        )}

        <div className='flex flex-col md:flex-row justify-around mt-4 space-y-2 md:space-y-0'>
          <button type="button" onClick={onPrevious} className='bg-red-700 text-white font-medium p-2 rounded-xl w-full md:w-auto'>Previous</button>
          <button type="button" onClick={onSkip} className='font-medium w-full md:w-auto'>Skip</button>
          <button type="submit" className='bg-green-700 text-white font-medium p-2 rounded-xl w-full md:w-auto'>Submit</button>
        </div>
      </div>
    </form>
  );
};

export default SurveyForm;
