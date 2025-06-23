import axiosInstance from '@/utils/axiosInstance';
import Cookies from 'js-cookie';

const handleError = (error) => {
  if (error.response) {
    throw new Error(error.response.data.message || 'An error occurred while processing your request');
  } else if (error.request) {
    throw new Error('No response received from server');
  } else {
    throw new Error('Error setting up the request');
  }
};

export const startTest = async (testId) => {
  const token = Cookies.get("token");
  console.log(testId,"testId........start test")
  try {
    const response = await axiosInstance.post('/api/test/start', { testId });
    console.log(response,"response........start test1111")
    return response.data;
  } catch (error) {
    console.log(error,"error........error",error.response)
    if (error.response && error.response.status === 400) {
      console.log(error.response.data.message,"error.response.data.message")
      throw {
        status: error.response.status,
        message: 'You have already attempted this test...'
      };
    }
    console.error('Error starting test:', error);
    throw {
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'Failed to start test'
    };
  }
};

export const fetchQuestion = async (testAttemptId, questionNumber) => {
  console.log(testAttemptId, questionNumber);
  try {
    const response = await axiosInstance.get('/api/test/question', {
      params: {
        testAttemptId,
        questionNumber
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching question:', error);
    throw handleError(error);
  }
};
export const fetchAnswer = async (testAttemptId) => {

  try {
    const response = await axiosInstance.get('/api/test/result', {
      params: {
        testAttemptId
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching question:', error);
    throw handleError(error);
  }
};

export const submitAnswer = async (testAttemptId, questionId, selectedOptionId) => {
  const token = Cookies.get("token");
  try {
    const response = await axiosInstance.post('/api/test/answer', 
      {
        testAttemptId,
        questionId,
        selectedOptionId,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response,"response.data........inside submit answer")
    return response.data;
  } catch (error) {
    console.error('Error submitting answer:', error);
    throw handleError(error);
  }
};

export const submitTest = async (testAttemptId) => {
  const token = Cookies.get("token");
  console.log(testAttemptId,"testAttemptId........submit test")
  try {
    const response = await axiosInstance.post('/api/test/submit', 
      { testAttemptId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response,"response........submit test")
    return response.data;
  } catch (error) {
    
    console.error('Error submitting test:', error);
    throw handleError(error);
  }
}; 