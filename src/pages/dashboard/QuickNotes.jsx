import { useDashboard } from '@/context/dashboardContext/DashboardContextProvider';
import { useState, useEffect } from 'react';
import { FaTrash, FaEdit, FaPlus, FaMinus, FaEye } from 'react-icons/fa';

// Helper functions for truncation
const truncateText = (text, maxLength) => {
  if (!text || typeof text !== 'string') return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const QuickNotes = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [previewNote, setPreviewNote] = useState(null);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);

  const {
    fetchQuickNotes,
    addQuickNote,
    removeQuickNote,
    editQuickNote,
    quickNotes,
  } = useDashboard();

  useEffect(() => {
    fetchQuickNotes()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, []);

  const handleAddOrEditNote = () => {
    if (!title.trim() || !description.trim()) {
      setError('Title and description cannot be empty.');
      return;
    }

    const noteData = {
      title: title.trim(),
      description: description.trim(),
      createdDate: editingId ? undefined : new Date().toISOString(),
      updatedDate: new Date().toISOString(),
    };

    if (editingId) {
      editQuickNote(editingId, noteData).then(() => resetForm());
    } else {
      addQuickNote(noteData).then(() => resetForm());
    }
  };

  const handleRemoveNote = (id) => {
    removeQuickNote(id);
  };

  const handleEditNote = (note) => {
    setTitle(note.title);
    setDescription(note.description);
    setEditingId(note.id);
    setIsInputVisible(true);
  };

  const handlePreviewNote = (note) => {
    setPreviewNote(note);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setEditingId(null);
    setIsInputVisible(false);
    setError('');
  };

  return (
    <div className="relative m-5 bg-white shadow-lg rounded-xl border border-gray-200 h-80 overflow-y-auto ">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 bg-white rounded-t-xl shadow-md sticky top-0 z-10 p-4">
        <h2 className="text-2xl font-bold text-gray-800">Quick Notes</h2>
        <button
          onClick={() => {
            resetForm();
            setIsInputVisible(!isInputVisible);
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-md transition-all p-2">
          {!isInputVisible ? <FaPlus /> : <FaMinus />}
        </button>
      </div>
      <div className="p-2">
        {/* Input Form */}
        {isInputVisible && (
          <div className="flex flex-col gap-2 mb-6 ">
            <input
              type="text"
              placeholder="Enter title"
              className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Enter description"
              className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              className={`w-full py-3 rounded-lg shadow-md text-white font-bold ${
                editingId
                  ? 'bg-yellow-500 hover:bg-yellow-600'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
              onClick={handleAddOrEditNote}>
              {editingId ? 'Update Note' : 'Add Note'}
            </button>
          </div>
        )}

        {/* Notes Display */}
        {!isInputVisible && (
          <>
            {isLoading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : quickNotes.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-gray-500 italic text-center">
                <p>No notes available. Add a new note to get started!</p>
                <button
                  onClick={() => setIsInputVisible(true)}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md">
                  Add New Note
                </button>
              </div>
            ) : (
              <div
                className="grid gap-6"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                }}>
                {quickNotes.map((note) => (
                  <div
                    key={note.id}
                    className={`flex flex-col p-4 rounded-lg shadow-md transition-all ${
                      previewNote?.id === note.id
                        ? 'bg-blue-100'
                        : 'bg-gray-200/60 hover:shadow-lg'
                    }`}>
                    <h3 className="font-semibold text-md text-gray-800 truncate">
                      {truncateText(note.title || 'Untitled Note', 20)}
                    </h3>
                    <p className="text-gray-600 text-sm mt-2 overflow-hidden overflow-ellipsis">
                      {truncateText(
                        note.description || 'No description available.',
                        60,
                      )}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      Created:{' '}
                      {note.createdDate
                        ? new Date(note.createdDate).toLocaleString()
                        : 'Unknown Date'}
                    </p>
                    <div className="flex justify-end space-x-3 mt-4">
                      <button
                        className="text-blue-500 hover:text-blue-600"
                        onClick={() =>
                          setPreviewNote(
                            previewNote?.id === note.id ? null : note,
                          )
                        }>
                        <FaEye />
                      </button>
                      <button
                        className="text-yellow-500 hover:text-yellow-600"
                        onClick={() => handleEditNote(note)}>
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleRemoveNote(note.id)}>
                        <FaTrash />
                      </button>
                    </div>
                    {previewNote?.id === note.id && (
                      <div className="mt-4 p-4 bg-white rounded-lg shadow-inner">
                        <h4 className="text-lg font-bold text-gray-800 mb-2">
                          {previewNote.title}
                        </h4>
                        <p className="text-gray-600">
                          {previewNote.description}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default QuickNotes;
