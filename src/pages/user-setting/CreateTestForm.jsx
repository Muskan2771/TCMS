import React, { useState } from 'react';
import Button from '../../components/common/buttons/Button';

const CreateTestForm = ({ onSubmit, onCancel, courseId }) => {
  const [formData, setFormData] = useState({
    id: 0,
    courseId: courseId,
    questions: [
      {
        id: 0,
        question: '',
        options: [
          { id: 0, option: '' },
          { id: 1, option: '' },
          { id: 2, option: '' },
          { id: 3, option: '' }
        ],
        correctAnswerText: ''
      }
    ]
  });

  const handleQuestionChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === index ? { ...q, [field]: value } : q
      )
    }));
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === questionIndex ? {
          ...q,
          options: q.options.map((opt, j) => 
            j === optionIndex ? { ...opt, option: value } : opt
          )
        } : q
      )
    }));
  };

  const addQuestion = () => {
    setFormData(prev => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          id: prev.questions.length,
          question: '',
          options: [
            { id: 0, option: '' },
            { id: 1, option: '' },
            { id: 2, option: '' },
            { id: 3, option: '' }
          ],
          correctAnswerText: ''
        }
      ]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {formData.questions.map((question, questionIndex) => (
        <div key={questionIndex} className="border p-4 rounded-lg">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question {questionIndex + 1}
            </label>
            <textarea
              value={question.question}
              onChange={(e) => handleQuestionChange(questionIndex, 'question', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Options
            </label>
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center gap-2">
                <input
                  type="text"
                  value={option.option}
                  onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={`Option ${optionIndex + 1}`}
                  required
                />
                <input
                  type="radio"
                  name={`correctAnswer-${questionIndex}`}
                  checked={question.correctAnswerText === option.option}
                  onChange={() => handleQuestionChange(questionIndex, 'correctAnswerText', option.option)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm text-gray-500">Correct</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center">
        <Button
          type="button"
          className="secondary"
          onClick={addQuestion}
        >
          Add Question1
        </Button>
        <div className="flex gap-4">
          <Button
            type="button"
            className="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="primary"
          >
            Create Test
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreateTestForm; 