import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/buttons/Button';
import { startTest, fetchQuestion, submitAnswer, submitTest } from '../../services/testService';
import Swal from 'sweetalert2';

const TestInterface = ({ testId, courseName, courseId }) => {
  const navigate = useNavigate();
  const [testAttempt, setTestAttempt] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    initializeTest();
  }, []);

  const initializeTest = async () => {
    try {
      const data = await startTest(testId);
      setTestAttempt(data);
      await loadQuestion(data.testAttemptId, 1);
    } catch (error) {
      console.log(error,"error........",error.status)
      if (error.status === 400) {
        // Handle already-attempted test
        setLoading(false);
      
        const { isConfirmed, isDismissed } = await Swal.fire({
          icon: 'info',
          title: 'Test Already Attempted',
          text: `You have already taken this test. Your score was ${error.score ?? 'N/A'}`,
          // showCancelButton: true,
          // showDenyButton: true,
          // confirmButtonText: 'Show Results',
          confirmButtonText: 'Back to Course',
          // cancelButtonText: 'Stay Here'
        });
      
        // Navigate based on user choice
        if (isConfirmed) {
          navigate(`/my-courses`);

        } 
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: error.message || 'Failed to start test',
          confirmButtonText: 'OK'
        });
        navigate(`/course/${courseId}`);
      }}
      
  };

  const loadQuestion = async (testAttemptId, questionNumber) => {
    try {
      const data = await fetchQuestion(testAttemptId, questionNumber);
      setCurrentQuestion(data);
      console.log(data,"data........load question",currentQuestion)
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch question');
      console.error('Error fetching question:', error);
    }
  };

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
  };

  const handleNextQuestion = async () => {
    if (!selectedOption) return;

    try {
      setButtonLoading(true);
      console.log(testAttempt,"testAttempt........",currentQuestion,selectedOption)
      const data = await submitAnswer(
        testAttempt.testAttemptId,
        currentQuestion.questionId,
        selectedOption
      );
     
      if (data.nextAction === 'next_question') {
        const nextQuestionNumber = currentQuestion.currentQuestionNumber + 1;
        await loadQuestion(testAttempt.testAttemptId, nextQuestionNumber);
        setSelectedOption(null);
      }
    } catch (error) {
      setError('Failed to save answer');
      console.error('Error saving answer:', error);
    } finally {
      setButtonLoading(false);
    }
  };

  const handleSubmitTest = async () => {
    try {
      // Show confirmation modal
      const result = await Swal.fire({
        title: 'Submit Test',
        text: 'Are you sure you want to submit your test?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, submit',
        cancelButtonText: 'No, review'
      });

      if (result.isConfirmed) {
        setButtonLoading(true);
        const submitAnswerResponse = await submitAnswer(
          testAttempt.testAttemptId,
          currentQuestion.questionId,
          selectedOption
        );
        const testResult = await submitTest(testAttempt.testAttemptId);
        
        // Show success modal with options
        const { isConfirmed, isDismissed, isDenied } = await Swal.fire({
          icon: 'success',
          title: 'Test Submitted Successfully!',
          text: 'What would you like to do next?',
          showCancelButton: true,
          showDenyButton: true,
          confirmButtonText: 'Show Results',
          denyButtonText: 'Back to Course'
        });

        if (isConfirmed) {
          // Show test results in a modal
          await Swal.fire({
            title: 'Test Results',
            html: `
              <div class="text-left">
                <div class="mb-4">
                  <h3 class="text-lg font-semibold mb-2">${courseName}</h3>
                  <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg mb-3">
                    <span class="font-semibold">Status:</span>
                    <span class="font-bold ${testResult.status === 'PASSED' ? 'text-green-600' : 'text-red-600'}">
                      ${testResult.status}
                    </span>
                  </div>
                  
                  <div class="grid grid-cols-2 gap-3 mb-3">
                    <div class="p-3 bg-gray-50 rounded-lg">
                      <p class="text-sm text-gray-600">Score</p>
                      <p class="text-xl font-bold">${testResult.score}%</p>
                    </div>
                    <div class="p-3 bg-gray-50 rounded-lg">
                      <p class="text-sm text-gray-600">Correct Answers</p>
                      <p class="text-xl font-bold">${testResult.correctAnswers}/${testResult.totalQuestions}</p>
                    </div>
                  </div>

                  <div class="p-3 bg-gray-50 rounded-lg mb-3">
                    <p class="text-sm text-gray-600">Message</p>
                    <p class="text-lg font-semibold">${testResult.message}</p>
                  </div>

                  <div class="grid grid-cols-2 gap-3">
                    <div class="p-3 bg-gray-50 rounded-lg">
                      <p class="text-sm text-gray-600">Start Time</p>
                      <p class="font-medium">${new Date(testResult.attemptTime).toLocaleString()}</p>
                    </div>
                    <div class="p-3 bg-gray-50 rounded-lg">
                      <p class="text-sm text-gray-600">Completion Time</p>
                      <p class="font-medium">${new Date(testResult.completionTime).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            `,
            width: '600px',
            showConfirmButton: true,
            confirmButtonText: 'Back to Course',
            confirmButtonColor: '#3085d6',
            showCloseButton: true,
            customClass: {
              container: 'test-results-modal'
            }
          });
          navigate('/my-courses');
        } else if (isDenied) {
          navigate('/my-courses');
        } else if (isDismissed) {
          navigate('/my-courses');
        }
      }
    } catch (error) {
      setError('Failed to submit test');
      console.error('Error submitting test:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to submit test. Please try again.',
        confirmButtonText: 'OK'
      });
    } finally {
      setButtonLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading test...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">{courseName}</h2>
          <p className="text-gray-600">
            Question {currentQuestion?.currentQuestionNumber} of {currentQuestion?.totalQuestions}
          </p>
        </div>

        <div className="mb-6">
          <p className="text-lg mb-4">{currentQuestion?.questionText}</p>
          <div className="space-y-3">
            {currentQuestion?.options.map((option) => (
              <div
                key={option.optionId}
                className={`p-3 rounded-lg cursor-pointer border ${
                  selectedOption === option.optionId
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => handleOptionSelect(option.optionId)}
              >
                {option.optionText}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between space-x-4">
          <Button
            className="secondary"
            onClick={() => navigate(`/course/${courseId}`)}
          >
            Cancel
          </Button>
          {currentQuestion?.lastQuestion ? (
            <Button
              className="primary"
              onClick={handleSubmitTest}
              disabled={!selectedOption || buttonLoading}
              loading={buttonLoading}
            >
              Submit Test
            </Button>
          ) : (
            <Button
              className="primary"
              onClick={handleNextQuestion}
              disabled={!selectedOption || buttonLoading}
              loading={buttonLoading}
            >
              Next Question
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestInterface; 