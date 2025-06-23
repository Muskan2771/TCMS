import axiosInstance from '@/utils/axiosInstance';
import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = '/api';

const handleError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    throw new Error(error.response.data.message || 'An error occurred while processing your request');
  } else if (error.request) {
    // The request was made but no response was received
    throw new Error('No response received from server');
  } else {
    // Something happened in setting up the request that triggered an Error
    throw new Error('Error setting up the request');
  }
};

export const createCourse = async (courseData) => {
  console.log(courseData,"courseData");
    try {

    const response = await axiosInstance.post(`/api/course/create`, courseData);
    return response.data;
  } catch (error) {
    console.log(error,"error from create course");
    throw handleError(error);
  }
};

export const getCourses = async () => {
  try {
    const response = await axiosInstance.get(`/api/course/all`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const getCourseById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/course/${id}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const updateCourse = async (id, courseData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/course/${id}`, courseData);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const deleteCourse = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/course/${id}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const getTests = async (courseId) => {
    const token = Cookies.get("token");
    console.log(token,"token from get tests service",courseId);
  try {
   
   
    const response = await axios.get(`/api/course/tests/get-tests`, {
      params: { courseId },
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.log(error,"error from get tests service");
    throw handleError(error);
  }
}; 

export const createTest = async (testData) => {

      try {
  
      const response = await axiosInstance.post(`/api/course/tests/create`, testData);
      return response.data;
    } catch (error) {
      console.log(error,"error from create course");
      throw handleError(error);
    }
  };

  export const getMyCourses = async () => {
   
    try {
      const response = await axiosInstance.get(`/api/user-course/my-courses`)
      return response.data;
    } catch (error) {
      console.log(error,"error from get my courses service");
      throw handleError(error);
    }
  };

export const getCourseDetails = async (courseId) => {
  const token = Cookies.get("token");
  console.log(token,"token")
  try {
    const response = await axios.get(`/api/user-course/my-courses/${courseId}`,{
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(response.data,"response from get course details service");
    return response.data;
  } catch (error) {
    console.log(error,"error from get course details service");
    throw handleError(error);
  }
};

export const getTestDetails = async (testId) => {
  try {
    const response = await axiosInstance.get(`/api/course/tests/${testId}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const submitTestAnswer = async (testId, answers) => {
  try {
    const response = await axiosInstance.post(`/api/course/tests/${testId}/submit`, { answers });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const updateTest = async (testId, testData) => {
  console.log("inside axios",testId,testData)
  try {
    const response = await axiosInstance.put(`/api/course/tests/update/${testId}`, testData);
    return response.data;
  } catch (error) {
    console.log(error, "error from update test service");
    throw handleError(error);
  }
};
  