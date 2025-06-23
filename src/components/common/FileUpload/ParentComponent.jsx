import React, { useRef } from "react";
import FileUploadTemplate from "./FileUploadTemplate";

const ParentComponent = () => {
  const fileUploadRef = useRef(null);

  const handleGetFiles = () => {
    const files = fileUploadRef.current.getSelectedFiles();
    console.log(files);
  };

  return (
    <div>
      <FileUploadTemplate
        ref={fileUploadRef}
        acceptedFileTypes={[
          ".csv",
          ".doc",
          ".docx",
          ".xls",
          ".xlsx",
          ".pdf",
          ".ppt",
          ".pptx",
          ".txt",
          ".jpg",
          ".jpeg",
          ".png",
          ".gif",
          ".zip",
          ".rar",
          ".mp3",
          ".wav",
          ".mp4",
          ".avi",
          ".mov",
        ]}
        onFilesSelected={(files) => console.log("Files selected:", files)}
        maxFiles={5}
        multiple={true}
      />
      <button onClick={handleGetFiles}>Get Selected Files</button>
    </div>
  );
};

export default ParentComponent;
