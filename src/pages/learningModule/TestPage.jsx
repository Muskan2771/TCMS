import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/common/buttons/Button';

// Dummy questions data
const dummyQuestions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris"
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },
  {
    id: 3,
    question: "What is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale"
  }
];

const TestPage = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question
  const [answers, setAnswers] = useState([]);
  const [testCompleted, setTestCompleted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleNextQuestion();
          return 30;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    // Save current answer
    setAnswers([...answers, {
      questionId: dummyQuestions[currentQuestionIndex].id,
      selectedAnswer: selectedAnswer
    }]);

    // Move to next question or complete test
    if (currentQuestionIndex < dummyQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setTimeLeft(30);
    } else {
      setTestCompleted(true);
    }
  };

  const handleSubmitTest = () => {
    // Calculate score
    const score = answers.reduce((total, answer) => {
      const question = dummyQuestions.find(q => q.id === answer.questionId);
      return total + (answer.selectedAnswer === question.correctAnswer ? 1 : 0);
    }, 0);

    // Navigate to results page or show results
    alert(`Test completed! Your score: ${score}/${dummyQuestions.length}`);
    navigate('/courses');
  };

  if (testCompleted) {
    return (
      <div className="p-8 min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Test Completed!</h2>
          <Button className="primary" onClick={handleSubmitTest}>
            View Results
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = dummyQuestions[currentQuestionIndex];

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto">
        {/* Progress and Timer */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-semibold">
              Question {currentQuestionIndex + 1} of {dummyQuestions.length}
            </div>
            <div className={`text-lg font-semibold ${timeLeft <= 10 ? 'text-red-500' : 'text-gray-700'}`}>
              Time Left: {timeLeft}s
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>
          
          {/* Options */}
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedAnswer === option
                    ? 'bg-blue-50 border-2 border-blue-500'
                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                }`}
                onClick={() => handleAnswerSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-end">
            <Button
              className="primary"
              onClick={handleNextQuestion}
              disabled={!selectedAnswer}
            >
              {currentQuestionIndex === dummyQuestions.length - 1 ? 'Finish Test' : 'Next Question'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage; 