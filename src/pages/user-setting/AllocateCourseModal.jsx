import React, { useState } from 'react';
import Button from '../../components/common/buttons/Button';
import axiosInstance from '../../utils/axiosInstance';
import { showAlert } from '../../components/common/toastify/ToastContainer';

const AllocateCourseModal = ({ user, courses, closeModal }) => {
  const [courseId, setCourseId] = useState('');
  const [allocationDate, setAllocationDate] = useState(new Date().toISOString().slice(0, 10));
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    console.log("course id",courseId)
    e.preventDefault();
    if (!courseId) {
      showAlert('error', 'Please select a course');
      return;
    }
    setLoading(true);
    try {
      await axiosInstance.post('/api/user-course/allocate', {
        userId: user.id,
        courseId: Number(courseId),
        allocationDate: new Date(allocationDate).toISOString(),
        completed,
      });
      showAlert('save', 'Course allocated successfully!');
      closeModal();
    } catch (err) {
      showAlert('error', err?.response?.data || 'Failed to allocate course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-2">
      <div>
        <label className="block mb-1 font-medium">Select Course</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={courseId}
          onChange={e => setCourseId(e.target.value)}
          required
        >
          <option value="">-- Select a course --</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>{course.name || course.title}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1 font-medium">Allocation Date</label>
        <input
          type="date"
          className="w-full border rounded px-3 py-2"
          value={allocationDate}
          onChange={e => setAllocationDate(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="completed"
          checked={completed}
          onChange={e => setCompleted(e.target.checked)}
        />
        <label htmlFor="completed">Completed</label>
      </div>
      <div className="flex justify-end gap-3">
        <Button type="button" className="secondary" onClick={closeModal} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" className="primary" disabled={loading}>
          {loading ? 'Allocating...' : 'Allocate'}
        </Button>
      </div>
    </form>
  );
};

export default AllocateCourseModal; 