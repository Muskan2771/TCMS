import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  FaCloudUploadAlt,
  FaFileCsv,
  FaFileWord,
  FaFileExcel,
  FaFilePdf,
  FaFilePowerpoint,
  FaFileAlt,
  FaFileImage,
  FaFileArchive,
  FaFileAudio,
  FaFileVideo,
} from 'react-icons/fa';

const FileUploadTemplate = forwardRef(
  (
    {
      acceptedFileTypes,
      onFilesSelected,
      maxFiles,
      multiple,
      onUpload,
      children,
      isDisabled,
      error,
    },
    ref,
  ) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileInputRef = useRef(null);

    useImperativeHandle(ref, () => ({
      getSelectedFiles: () => selectedFiles,
      clearFiles: () => {
        setSelectedFiles([]);
        fileInputRef.current.value = '';
      },
    }));

    const handleFileChange = (event) => {
      const files = Array.from(event.target.files);
      if (files.length + selectedFiles.length > maxFiles) {
        alert(`You can only upload up to ${maxFiles} files.`);
        return;
      }
      setSelectedFiles([...selectedFiles, ...files]);
      onFilesSelected([...selectedFiles, ...files]);
    };

    const handleFileRemove = (fileToRemove) => {
      const updatedFiles = selectedFiles.filter(
        (file) => file !== fileToRemove,
      );
      setSelectedFiles(updatedFiles);
      fileInputRef.current.value = ''; // Reset file input value
    };

    const getFileIcon = (fileName) => {
      const fileExtension = fileName.split('.').pop().toLowerCase();
      switch (fileExtension) {
        case 'csv':
          return <FaFileCsv size={36} className="text-[#ffb800] mb-2" />;
        case 'doc':
        case 'docx':
          return <FaFileWord size={36} className="text-[#ffb800] mb-2" />;
        case 'xls':
        case 'xlsx':
          return <FaFileExcel size={36} className="text-[#ffb800] mb-2" />;
        case 'pdf':
          return <FaFilePdf size={36} className="text-[#ffb800] mb-2" />;
        case 'ppt':
        case 'pptx':
          return <FaFilePowerpoint size={36} className="text-[#ffb800] mb-2" />;
        case 'txt':
          return <FaFileAlt size={36} className="text-[#ffb800] mb-2" />;
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
          return <FaFileImage size={36} className="text-[#ffb800] mb-2" />;
        case 'zip':
        case 'rar':
          return <FaFileArchive size={36} className="text-[#ffb800] mb-2" />;
        case 'mp3':
        case 'wav':
          return <FaFileAudio size={36} className="text-[#ffb800] mb-2" />;
        case 'mp4':
        case 'avi':
        case 'mov':
          return <FaFileVideo size={36} className="text-[#ffb800] mb-2" />;
        default:
          return <FaCloudUploadAlt size={36} className="text-[#ffb800] mb-2" />;
      }
    };

    const handleUpload = async () => {
      if (onUpload) {
        await onUpload(selectedFiles);
        setSelectedFiles([]); // Clear selected files after successful upload
        fileInputRef.current.value = ''; // Reset file input value
      }
    };

    return (
      <div className="flex justify-center">
        <div>
          <motion.div
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center mb-6 hover:border-blue-500 transition w-96 h-60"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}>
            <label
              className="flex flex-col items-center cursor-pointer"
              htmlFor="file-upload">
              <input
                ref={fileInputRef}
                id="file-upload"
                type="file"
                accept={acceptedFileTypes.join(',')}
                className="hidden"
                multiple={multiple}
                onChange={handleFileChange}
                disabled={selectedFiles.length >= maxFiles}
              />
              {selectedFiles.length > 0 ? (
                selectedFiles.map((file, index) => (
                  <motion.div
                    key={index}
                    className="text-gray-600 font-medium mt-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}>
                    <div className="flex justify-center">
                      {getFileIcon(file.name)}
                    </div>
                    <div className="text-sm">{file.name}</div>
                    <div className="text-center">
                      <button
                        className=" text-red-500 text-sm"
                        onClick={() => handleFileRemove(file)}
                        aria-label={`Remove ${file.name}`}>
                        Remove File
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div>
                  <div className="flex justify-center">
                    <FaCloudUploadAlt
                      size={36}
                      className="text-[#ffb800] mb-2 "
                    />
                  </div>

                  <span className="text-gray-600">
                    Drag and drop or click to choose files
                  </span>
                </div>
              )}
            </label>
          </motion.div>
          {selectedFiles.length > 0 && (
            <>
              {children}
              <small className="text-red-500 flex justify-center my-2 font-600 text-center">
                {error}
              </small>
            </>
          )}
          <button
            className={`w-full  text-white py-2 rounded-lg transition mb-4 px-10 ${
              selectedFiles.length === 0 || isDisabled
                ? 'btn-secondary cursor-not-allowed'
                : 'btn-primary'
            }`}
            disabled={selectedFiles.length === 0 || isDisabled}
            onClick={handleUpload}>
            Upload
          </button>
        </div>
      </div>
    );
  },
);

FileUploadTemplate.propTypes = {
  acceptedFileTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFilesSelected: PropTypes.func.isRequired,
  maxFiles: PropTypes.number,
  multiple: PropTypes.bool,
  onUpload: PropTypes.func,
};

FileUploadTemplate.defaultProps = {
  maxFiles: 5,
  multiple: true,
};

export default FileUploadTemplate;
