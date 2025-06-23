import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../../components/common/buttons/Button';
import Modal from '../../components/common/Modal';
import { IoMdAdd } from 'react-icons/io';
import { createTest, getTests, updateTest } from '../../services/courseService';
import { useAuth } from '../../context/authContext/AuthContextProvider';

const TestDetails = () => {
  const location = useLocation();
  const courseId = location.state?.courseId;
  const { isLoggedIn } = useAuth();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCreateTestModalOpen, setIsCreateTestModalOpen] = useState(false);
  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);
  const [selectedTestId, setSelectedTestId] = useState(null);
  const [newTest, setNewTest] = useState({
    id: 0,
    courseId: courseId || 0,
    questions: []
  });
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: [],
    correctAnswerText: ''
  });
  const { userCredential } = useAuth();

  useEffect(() => {
    const fetchTests = async () => {
      if (!courseId) return;
      setLoading(true);
      try {
        const data = await getTests(courseId);
        setTests(data);
      } catch (err) {
        console.log(err, "error from test details");
        setTests([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, [courseId, userCredential]);

  // Handle new test creation
  const handleCreateTest = async (e) => {
    e.preventDefault();
    try {
      await createTest(newTest);
      // Fetch updated tests after creating new test
      const updatedTests = await getTests(courseId);
      setTests(updatedTests);
      setNewTest({
        id: 0,
        courseId: courseId || 0,
        questions: []
      });
      setIsCreateTestModalOpen(false);
    } catch (error) {
      console.error('Error creating test:', error);
    }
  };

  // Handle adding a new question
  const handleAddQuestion = async () => {
    if (selectedTestId) {
      try {
        const selectedTest = tests.find(test => test.id === selectedTestId);
        const updatedTest = {
          courseId: courseId,
          questions: [
            ...selectedTest.questions,
            {
              question: newQuestion.question,
              options: newQuestion.options.map(opt => ({ option: opt.option })),
              correctAnswerText: newQuestion.correctAnswerText
            }
          ]
        };

        await updateTest(selectedTestId, updatedTest);
        
        // Fetch updated tests after adding question
        const updatedTests = await getTests(courseId);
        setTests(updatedTests);
        
        setNewQuestion({
          question: '',
          options: [],
          correctAnswerText: ''
        });
        setIsAddQuestionModalOpen(false);
      } catch (error) {
        console.error('Error adding question:', error);
      }
    }
  };

  return (
    <div className="p-14 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Tests</h1>
        <Button className="primary" onClick={() => setIsCreateTestModalOpen(true)}>
          Create New Test <IoMdAdd className="ml-2" />
        </Button>
      </div>

      {/* Create Test Modal */}
      <Modal
        isOpen={isCreateTestModalOpen}
        onClose={() => setIsCreateTestModalOpen(false)}
        title="Create New Test"
      >
        <div className="p-4">
          <form onSubmit={handleCreateTest}>
            <div className="space-y-4">
              {!courseId && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Course ID</label>
                  <input
                    type="number"
                    value={newTest.courseId}
                    onChange={(e) => setNewTest({ ...newTest, courseId: parseInt(e.target.value) })}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              )}
              <div className="flex justify-end gap-4 mt-6">
                <Button
                  type="button"
                  className="secondary"
                  onClick={() => setIsCreateTestModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="primary">
                  Create Test
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Modal>

      {/* Tests Grid */}
      {loading ? (
        <div className="text-center py-10">Loading tests...</div>
      ) : tests.length === 0 ? (
        <div className="text-center py-10 text-gray-500 text-lg">No tests present</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests?.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-xl shadow p-6 flex flex-col gap-3 border border-gray-100"
            >
              <h2 className="text-2xl font-semibold mb-1">Test #{test.id}</h2>
              <div className="flex flex-wrap gap-2 text-sm mb-2">
                <span className="bg-gray-100 px-2 py-1 rounded">Course ID: {test.courseId}</span>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                  {test.questions.length} Questions
                </span>
              </div>

              <div className="mt-4">
                <h3 className="font-medium mb-2">Questions:</h3>
                <div className="space-y-3">
                  {test.questions.map((question) => (
                    <div key={question.id} className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium">{question.question}</p>
                      <div className="mt-2 space-y-1">
                        {question.options.map((option) => (
                          <p
                            key={option.id}
                            className={`text-sm ${
                              option.option === question.correctAnswerText
                                ? 'text-green-600 font-medium'
                                : 'text-gray-600'
                            }`}
                          >
                            {option.option}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-2">
                <Button
                  className="secondary w-full"
                  onClick={() => {
                    setSelectedTestId(test.id);
                    setIsAddQuestionModalOpen(true);
                  }}
                >
                  Add Question
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Question Modal */}
      <Modal
        isOpen={isAddQuestionModalOpen}
        onClose={() => setIsAddQuestionModalOpen(false)}
        title="Add New Question"
      >
        <div className="p-4">
          <form onSubmit={(e) => {
            e.preventDefault();
            handleAddQuestion();
          }}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Question</label>
                <textarea
                  value={newQuestion.question}
                  onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows="3"
                />
              </div>
              {[0, 1, 2, 3].map((index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700">
                    Option {index + 1}
                  </label>
                  <input
                    type="text"
                    value={newQuestion.options[index]?.option || ''}
                    onChange={(e) => {
                      const newOptions = [...(newQuestion.options || [])];
                      newOptions[index] = { option: e.target.value };
                      setNewQuestion({ ...newQuestion, options: newOptions });
                    }}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700">Correct Answer</label>
                <select
                  value={newQuestion.correctAnswerText}
                  onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswerText: e.target.value })}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select Correct Answer</option>
                  {newQuestion.options.map((option, index) => (
                    <option key={index} value={option.option}>
                      {option.option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <Button
                  type="button"
                  className="secondary"
                  onClick={() => setIsAddQuestionModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="primary">
                  Add Question
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default TestDetails;
