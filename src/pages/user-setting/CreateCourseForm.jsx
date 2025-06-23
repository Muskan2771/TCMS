import React, { useState } from 'react';
import Button from '../../components/common/buttons/Button';
import { createCourse } from '../../services/courseService';

const CreateCourseForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    courseName: '',
    courseVideos: [{ videoLink: '' }],
    courseTest:null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.courseName.trim()) newErrors.courseName = 'Course name is required';
    if (formData.courseVideos.length === 0) newErrors.courseVideos = 'At least one video is required';
    formData.courseVideos.forEach((video, index) => {
      if (!video.videoLink.trim()) {
        newErrors[`videoLink-${index}`] = 'Video link is required';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await createCourse(formData);
        console.log(response,"response 35");
        // Transform the response to match the expected format
        const transformedResponse = {
          ...response,
          title: response.courseName
        };
        onSubmit(transformedResponse);
        onCancel();
      } catch (error) {
        console.error('Error creating course:', error);
        setErrors({ submit: error.message || 'Failed to create course. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVideoLinkChange = (index, value) => {
    setFormData(prev => ({
      ...prev,
      courseVideos: prev.courseVideos.map((video, i) => 
        i === index ? { ...video, videoLink: value } : video
      )
    }));
  };

  const addVideoField = () => {
    setFormData(prev => ({
      ...prev,
      courseVideos: [...prev.courseVideos, { videoLink: '' }]
    }));
  };

  const removeVideoField = (index) => {
    setFormData(prev => ({
      ...prev,
      courseVideos: prev.courseVideos.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="p-8 min-h-80 bg-gray-50">
      {/* <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6"> */}
        {/* <h1 className="text-3xl font-bold mb-6">Create New Course</h1> */}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="courseName" className="block text-sm font-medium text-gray-700 mb-1">
              Course Name *
            </label>
            <input
              type="text"
              id="courseName"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.courseName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter course name"
            />
            {errors.courseName && <p className="mt-1 text-sm text-red-500">{errors.courseName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Videos *
            </label>
            {formData.courseVideos.map((video, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="url"
                  value={video.videoLink}
                  onChange={(e) => handleVideoLinkChange(index, e.target.value)}
                  className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors[`videoLink-${index}`] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter video link"
                />
                <button
                  type="button"
                  onClick={() => removeVideoField(index)}
                  className="px-3 py-2 text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
            {errors.courseVideos && <p className="mt-1 text-sm text-red-500">{errors.courseVideos}</p>}
            <Button
              type="button"
              onClick={addVideoField}
              className="primary mt-2 px-4 py-2  hover:text-blue-800"
            >
              + Add Video
            </Button>
          </div>

          {errors.submit && (
            <p className="text-sm text-red-500">{errors.submit}</p>
          )}

          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              className="secondary"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Course'}
            </Button>
          </div>
        </form>
      </div>
    // </div>
  );
};

export default CreateCourseForm;
