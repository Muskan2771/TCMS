import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/buttons/Button';
import Modal from '../../components/common/Modal';
import CreateCourseForm from './CreateCourseForm';
import CreateTestForm from './CreateTestForm';
import { getCourses } from '../../services/courseService';

const CourseDetails = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [isCreateCourseModalOpen, setIsCreateCourseModalOpen] = useState(false);
  const [isCreateTestModalOpen, setIsCreateTestModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        console.log(data,"data from course details");
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Handle new course submission
  const handleCreateCourse = (courseData) => {
    // Ensure the course data has the correct format
    const formattedCourse = {
      ...courseData,
      title: courseData.courseName || courseData.title
    };
    setCourses((prev) => [formattedCourse, ...prev]);
    setIsCreateCourseModalOpen(false);
  };

  // Handle new test submission
  const handleCreateTest = (testData) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === selectedCourseId
          ? { ...course, tests: [...course.tests, testData] }
          : course
      )
    );
    setIsCreateTestModalOpen(false);
  };

  // Handle test button click
  const handleTestClick = (courseId) => {
    navigate('/create-test', { state: { courseId } });
  };

  if (loading) {
    return (
      <div className="p-8 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading courses...</div>
      </div>
    );
  }

  return (
    <div className="p-14 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Courses</h1>
        <Button className="primary" onClick={() => setIsCreateCourseModalOpen(true)}>
          Add New Course +
        </Button>
      </div>

      <Modal 
        isOpen={isCreateCourseModalOpen} 
        onClose={() => setIsCreateCourseModalOpen(false)}
        title="Create New Course"
      >
        <CreateCourseForm 
          onSubmit={handleCreateCourse}
          onCancel={() => setIsCreateCourseModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isCreateTestModalOpen}
        onClose={() => setIsCreateTestModalOpen(false)}
        title="Create New Test"
      >
        <CreateTestForm
          onSubmit={handleCreateTest}
          onCancel={() => setIsCreateTestModalOpen(false)}
          courseId={selectedCourseId}
        />
      </Modal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl shadow p-6 flex flex-col gap-3 border border-gray-100"
          >
            <h2 className="text-2xl font-semibold mb-1">{course.title}</h2>
            <Button
                className="secondary"
                onClick={() => handleTestClick(course.id)}
              >
                Test
              </Button>
            <div className="flex items-center justify-between">
              {/* <span className="text-gray-600">
                Tests: {course.tests?.length}
              </span> */}
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetails;
