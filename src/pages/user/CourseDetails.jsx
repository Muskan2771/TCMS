import React from 'react';
import { FaBook, FaClock, FaUser, FaCalendarAlt } from 'react-icons/fa';

const CourseDetails = () => {
  const courses = [
    {
      id: 1,
      title: 'Mathematics 101',
      instructor: 'Dr. Smith',
      duration: '12 weeks',
      startDate: '2024-03-01',
      progress: 75,
      description: 'Introduction to basic mathematical concepts and problem-solving techniques.',
      topics: ['Algebra', 'Calculus', 'Statistics']
    },
    {
      id: 2,
      title: 'Physics Fundamentals',
      instructor: 'Prof. Johnson',
      duration: '10 weeks',
      startDate: '2024-03-15',
      progress: 60,
      description: 'Core principles of physics including mechanics, thermodynamics, and electromagnetism.',
      topics: ['Mechanics', 'Thermodynamics', 'Electromagnetism']
    },
    {
      id: 3,
      title: 'Chemistry Basics',
      instructor: 'Dr. Williams',
      duration: '8 weeks',
      startDate: '2024-04-01',
      progress: 30,
      description: 'Introduction to chemical principles, reactions, and laboratory techniques.',
      topics: ['Atomic Structure', 'Chemical Bonding', 'Reactions']
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">My Courses</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">{course.title}</h2>
                <FaBook className="w-6 h-6 text-blue-500" />
              </div>
              
              <p className="text-gray-600 mb-4">{course.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <FaUser className="w-4 h-4 mr-2" />
                  <span>{course.instructor}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaClock className="w-4 h-4 mr-2" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaCalendarAlt className="w-4 h-4 mr-2" />
                  <span>Starts: {course.startDate}</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {course.topics.map((topic, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-full"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetails; 