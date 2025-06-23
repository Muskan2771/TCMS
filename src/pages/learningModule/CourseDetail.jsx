import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/common/buttons/Button';
import { getCourseDetails, getTests } from '../../services/courseService';
import TestInterface from './TestInterface';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const [copiedLink, setCopiedLink] = useState(null);

  // Function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Function to get YouTube thumbnail
  const getYouTubeThumbnail = (videoId) => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  // Function to handle copying link
  const handleCopyLink = (link, videoId) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(videoId);
    setTimeout(() => setCopiedLink(null), 2000); // Reset after 2 seconds
  };

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const courseData = await getCourseDetails(courseId);
        // console.log(courseData, "course data from details");
        setCourse(courseData);
        // const testsData = await getTests(courseId);
        // console.log(courseData.courseTests,"courseData.courseTests........")
        setTests(courseData.courseTests);
      } catch (error) {
        console.error('Error fetching course details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleStartTest = (test) => {
    setSelectedTest(test);
    setShowModal(true);
  };

  const handleConfirmTest = () => {
    setIsTestStarted(true);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTest(null);
  };

  if (loading) {
    return (
      <div className="p-8 min-h-screen bg-gray-50">
        <div className="text-center py-10">Loading course details...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="p-8 min-h-screen bg-gray-50">
        <div className="text-center py-10">Course not found</div>
      </div>
    );
  }

  if (isTestStarted && selectedTest) {
    return (
      <TestInterface
        testId={selectedTest.id}
        courseName={course.courseName}
        courseId={courseId}
      />
    );
  }

  return (
    <div className="p-14 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{course.courseName}</h1>
        
        {/* Course Videos Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Course Content</h2>
          
          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {course.courseVideos.map((video, index) => {
              const videoId = getYouTubeVideoId(video.videoLink);
              const isPlaying = playingVideoId === video.id;
              
              return (
                <div 
                  key={video.id} 
                  className="group transition-all duration-300"
                >
                  <div className="relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md">
                    {isPlaying ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                        title={`Video ${index + 1}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    ) : (
                      <>
                        <img
                          src={getYouTubeThumbnail(videoId)}
                          alt={`Video ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div 
                          className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300 cursor-pointer"
                          onClick={() => setPlayingVideoId(video.id)}
                        >
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                              <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="mt-2">
                    <h3 className="text-sm font-medium text-gray-900">Video {index + 1}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <a
                        href={video.videoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:text-blue-800 hover:underline truncate flex-1"
                      >
                        {video.videoLink}
                      </a>
                      <button
                        onClick={() => handleCopyLink(video.videoLink, video.id)}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        title="Copy link"
                      >
                        {copiedLink === video.id ? (
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tests Section */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold mb-6">Available Tests</h2>
          <div className="space-y-4">
            {tests.map((test) => (
              <div
                key={test.id}
                className="bg-gray-50 p-4 rounded-lg flex justify-between items-center"
              >
                <h3 className="font-semibold">Test {test.id}</h3>
                <Button
                  className="primary"
                  onClick={() => handleStartTest(test)}
                >
                  Start Test
                </Button>
              </div>
            ))}
            {tests.length === 0 && (
              <p className="text-center text-gray-600">No tests available for this course.</p>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && selectedTest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Confirm Test</h2>
            <div className="space-y-4">
              <p><span className="font-semibold">Course Name:</span> {course.courseName}</p>
              <p><span className="font-semibold">Test Name:</span> Test {selectedTest.id}</p>
              <p><span className="font-semibold">Number of Questions:</span> {selectedTest.numberOfQuestions || 'N/A'}</p>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <Button
                className="secondary"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
              <Button
                className="primary"
                onClick={handleConfirmTest}
              >
                Start Test
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail; 
