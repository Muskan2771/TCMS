import { useState } from "react";

export const useLoading = () => {
  const [isLoading, setisLoading] = useState(false);
  const [loadingText, setloadingText] = useState("");
  const [downloadPercentage, setDownloadPercentage] = useState(null);

  const startLoading = () => {
    setisLoading(true);
  };

  const stopLoading = () => {
    setisLoading(false);
  };

  return {
    isLoading,
    startLoading,
    stopLoading,
    setloadingText,
    loadingText,
    downloadPercentage,
    setDownloadPercentage,
  };
};
