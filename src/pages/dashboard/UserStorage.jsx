import { useState, useEffect } from 'react';
import {
  FaFilePdf,
  FaFileExcel,
  FaGlobe,
  FaTrash,
  FaEdit,
  FaPlus,
  FaMinus,
} from 'react-icons/fa';

const fileIconMapper = {
  pdf: <FaFilePdf className="text-red-500" />,
  excel: <FaFileExcel className="text-green-500" />,
  website: <FaGlobe className="text-blue-500" />,
};

const UserStorage = () => {
  const [userItems, setUserItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const storedItems = JSON.parse(localStorage.getItem('userItems')) || [];
      setUserItems(storedItems);
      setIsLoading(false);
    }, 1000); // Show skeleton for 1 second
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('userItems', JSON.stringify(items));
  };

  const addOrEditItem = () => {
    if (!inputValue) return;

    const updatedItems = [...userItems];
    if (editingIndex !== null) {
      updatedItems[editingIndex] = inputValue;
      setEditingIndex(null);
    } else {
      updatedItems.push(inputValue);
    }

    setUserItems(updatedItems);
    saveToLocalStorage(updatedItems);
    setInputValue('');
    setIsInputVisible(false);
  };

  const removeItem = (index) => {
    const updatedItems = userItems.filter((_, i) => i !== index);
    setUserItems(updatedItems);
    saveToLocalStorage(updatedItems);
  };

  const editItem = (index) => {
    setInputValue(userItems[index]);
    setEditingIndex(index);
    setIsInputVisible(true);
  };

  const highlightLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) =>
      urlRegex.test(part) ? (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline">
          {part}
        </a>
      ) : (
        <span key={index}>{part}</span>
      ),
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        </div>
      );
    }

    if (userItems.length === 0) {
      return (
        <p className="text-gray-500 italic text-center">
          No notes added. Click the plus icon to add a quick note.
        </p>
      );
    }
    return userItems.map((item, index) => (
      <div
        key={index}
        className="flex items-center justify-between p-3 bg-gray-100 rounded-md shadow-sm">
        <div className="flex-1 text-gray-700 truncate w-40">
          {highlightLinks(item)}
        </div>
        <div className="flex space-x-2">
          <button
            className="text-yellow-500"
            onClick={() => editItem(index)}
            id="btn-add-new">
            <FaEdit />
          </button>
          <button className="text-red-500" onClick={() => removeItem(index)}>
            <FaTrash />
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="p-6 m-5 bg-white shadow-lg rounded-xl border border-gray-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          Quick Notes{' '}
        </h2>
        <button
          onClick={() => setIsInputVisible(!isInputVisible)}
          className="bg-blue-500 text-white p-2 rounded-full">
          {!isInputVisible ? <FaPlus /> : <FaMinus />}
        </button>
      </div>
      {isInputVisible && (
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter text or link"
            className="border p-2 rounded w-2/3"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded w-1/3"
            onClick={addOrEditItem}>
            {editingIndex !== null ? 'Update' : 'Add'}
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 gap-3">{renderContent()}</div>
    </div>
  );
};

export default UserStorage;
