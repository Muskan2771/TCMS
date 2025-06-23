import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/buttons/Button';
import { getMyCourses } from '../../services/courseService';
import { useAuth } from '../../context/authContext/AuthContextProvider';

const MyCourses = () => {
  const navigate = useNavigate();
  const { userCredential } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const courses = await getMyCourses();
        console.log(courses,"courses list")
        setCourses(courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleViewDetails = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="p-14 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-8">My Courses</h1>

      {loading ? (
        <div className="text-center py-10">Loading courses...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow p-6 flex flex-col gap-3 border border-gray-100"
            >
              <h2 className="text-2xl font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <Button
                className="primary w-full"
                onClick={() => handleViewDetails(course.id)}
              >
                View Details
              </Button>
            </div>
          ))}
          {courses.length === 0 && (
            <p className="text-center text-gray-600 col-span-full">No courses available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
