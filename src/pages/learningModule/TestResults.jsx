import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/common/buttons/Button';
import axios from 'axios';
import { fetchAnswer } from '@/services/testService';

const TestResults = () => {
  const { testAttemptId } = useParams();
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTestResults();
  }, [testAttemptId]);

  const fetchTestResults = async () => {
    try {
      const response = await fetchAnswer(testAttemptId);
      setResults(response);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch test results');
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading results...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Test Results</h2>
          <p className="text-gray-600">{results?.courseName}</p>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="font-semibold">Status:</span>
            <span className={`font-bold ${results?.status === 'PASSED' ? 'text-green-600' : 'text-red-600'}`}>
              {results?.status}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Score</p>
              <p className="text-xl font-bold">{results?.score}%</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Correct Answers</p>
              <p className="text-xl font-bold">{results?.correctAnswers}/{results?.totalQuestions}</p>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Message</p>
            <p className="text-lg font-semibold">{results?.message}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Start Time</p>
              <p className="font-medium">{new Date(results?.attemptTime).toLocaleString()}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Completion Time</p>
              <p className="font-medium">{new Date(results?.completionTime).toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            className="primary"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestResults; 