import { showAlert } from '@/components';
import axiosInstance from '@/utils/axiosInstance';

/**
 * Uploads an account consolidation file to the server.
 *
 * @async
 * @function uploadAccountConsolidationFile
 * @param {FormData} formData - The form data containing the file to be uploaded.
 * @returns {Promise<Blob|undefined>} A promise that resolves to a Blob containing error records
 *                                    in CSV format if the response status is 206, or undefined otherwise.
 * @throws {Error} Throws an error if the upload fails.
 *
 * @description
 * This function sends a POST request to upload an account consolidation file. If the server
 * responds with a status of 206, it indicates that the file was uploaded successfully but
 * contains some error records. These error records are returned as a Blob in CSV format.
 * If the upload is successful without errors, a success alert is displayed. In case of an
 * error during the upload, an error alert is displayed with the appropriate message.
 *
 * @example
 * const formData = new FormData();
 * formData.append('file', fileInput.files[0]);
 *
 * try {
 *   const errorBlob = await uploadAccountConsolidationFile(formData);
 *   if (errorBlob) {
 *     // Handle the error records in the Blob
 *   }
 * } catch (error) {
 *   console.error('File upload failed:', error);
 * }
 */
export const uploadAccountConsolidationFile = async (formData) => {
  try {
    const response = await axiosInstance.post(
      '/api/account-consolidation/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob', // Ensure response type is set to 'blob'
      },
    );
    if (response.status === 206) {
      showAlert(
        'success',
        'File uploaded successfully, but some error records were found.',
      );
      return new Blob([response.data], { type: 'text/csv' });
    } else {
      showAlert('success', 'File uploaded successfully.');
    }
  } catch (error) {
    console.log(error);
    let errorMessage = 'An error occurred while uploading the file';
    if (error.response && error.response.data) {
      const reader = new FileReader();
      reader.onload = () => {
        showAlert('error', reader.result || errorMessage);
      };
      reader.readAsText(error.response.data);
    } else {
      showAlert('error', error.message || errorMessage);
    }
    throw error;
  }
};
