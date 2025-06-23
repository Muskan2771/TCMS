import { createContext, useCallback, useContext, useState } from 'react';
import {
  getQuickNotes,
  postQuickNotes,
  deleteQuickNotes,
  updateQuickNotes,
  getNotification,
  getClientResources,
  postClientResources,
  deleteClientResources,
  updateClientResources,
  postNotification,
  deleteNotification,
  updateNotification,
} from '../../services/dashboardService';
import { useLoading } from '@/utils/LoadingUtil'; // Import loading utility
import { showAlert } from '@/components';

const DashboardContext = createContext({
  fetchQuickNotes: () => {},
  addQuickNote: () => {},
  removeQuickNote: () => {},
  editQuickNote: () => {},
  fetchNotifications: () => {},
  fetchClientResources: () => {},
  addClientResource: () => {},
  removeClientResource: () => {},
  editClientResource: () => {},
  addNotification: () => {},
  removeNotification: () => {},
  editNotification: () => {},
  quickNotes: null,
  notifications: null,
  clientResources: null, // Add clientResources to context
  isLoading: false, // Add isLoading to context
});

export const useDashboard = () => useContext(DashboardContext);

const DashboardContextProvider = ({ children }) => {
  const [quickNotes, setQuickNotes] = useState([]); // Initialize as an empty array
  const [notifications, setNotifications] = useState([]); // Ensure it's an empty array
  const [clientResources, setClientResources] = useState([]); // Initialize as an empty array
  const { isLoading, startLoading, stopLoading } = useLoading(); // Use loading utility

  const fetchQuickNotes = useCallback(async () => {
    try {
      startLoading(); // Start loading
      const data = await getQuickNotes();
      if (!data || data.length === 0) {
        // Handle 204 or empty response
        setQuickNotes([
          {
            id: 'dummy',
            title: 'Welcome to Quick Notes!',
            description:
              'Start by adding your first note to keep track of your tasks.',
            createdDate: new Date().toISOString(), // Ensure valid date
          },
        ]);
      } else {
        setQuickNotes(data.filter((note) => note.title && note.description)); // Filter out empty notes
      }
    } catch (error) {
      showAlert(
        'error',
        error.response?.data || 'An error occurred while updating the resource',
      );
      console.error('Error fetching quick notes:', error);
      setQuickNotes([]); // Fallback to an empty array on error
    } finally {
      stopLoading(); // Stop loading
    }
  }, [startLoading, stopLoading]);

  const addQuickNote = useCallback(
    async (noteData) => {
      try {
        startLoading(); // Start loading
        await postQuickNotes(noteData);
        fetchQuickNotes();
      } catch (error) {
        showAlert(
          'error',
          error.response?.data ||
            'An error occurred while updating the resource',
        );
        console.error('Error adding quick note:', error);
      } finally {
        stopLoading(); // Stop loading
      }
    },
    [fetchQuickNotes, startLoading, stopLoading],
  );

  const removeQuickNote = useCallback(
    async (id) => {
      try {
        startLoading(); // Start loading
        await deleteQuickNotes(id);
        fetchQuickNotes();
      } catch (error) {
        showAlert(
          'error',
          error.response?.data ||
            'An error occurred while updating the resource',
        );
        console.error('Error removing quick note:', error);
      } finally {
        stopLoading(); // Stop loading
      }
    },
    [fetchQuickNotes, startLoading, stopLoading],
  );

  const editQuickNote = useCallback(
    async (id, noteData) => {
      try {
        startLoading(); // Start loading
        const existingNote = quickNotes.find((note) => note.id === id); // Find the existing note
        const updatedNote = { ...existingNote, ...noteData }; // Merge existing note with updated fields
        await updateQuickNotes(id, updatedNote); // Send the full object to the API
        setQuickNotes((prevNotes) =>
          prevNotes.map(
            (note) => (note.id === id ? updatedNote : note), // Update the specific note in the state
          ),
        );
      } catch (error) {
        showAlert(
          'error',
          error.response?.data ||
            'An error occurred while updating the resource',
        );
        console.error('Error editing quick note:', error);
      } finally {
        stopLoading(); // Stop loading
      }
    },
    [quickNotes, startLoading, stopLoading],
  );

  const fetchNotifications = useCallback(async () => {
    try {
      startLoading(); // Start loading
      const data = await getNotification();
      setNotifications(data);
    } catch (error) {
      showAlert(
        'error',
        error.response?.data || 'An error occurred while updating the resource',
      );
      console.error('Error fetching notifications:', error);
    } finally {
      stopLoading(); // Stop loading
    }
  }, [startLoading, stopLoading]);

  const fetchClientResources = useCallback(async () => {
    try {
      startLoading(); // Start loading
      const data = await getClientResources();
      setClientResources(
        data.map((resource) => ({
          id: resource.id,
          title: resource.title,
          link: resource.link,
          assignedRoleId: resource.assignedRoleId,
          createdDate: resource.createdDate,
          updatedDate: resource.updatedDate,
        })),
      );
    } catch (error) {
      showAlert(
        'error',
        error.response?.data || 'An error occurred while updating the resource',
      );
      console.error('Error fetching client resources:', error);
      setClientResources([]); // Fallback to an empty array on error
    } finally {
      stopLoading(); // Stop loading
    }
  }, [startLoading, stopLoading]);

  const addClientResource = useCallback(
    async (resourceData) => {
      try {
        startLoading(); // Start loading
        await postClientResources(resourceData);
        fetchClientResources();
      } catch (error) {
        showAlert(
          'error',
          error.response?.data ||
            'An error occurred while updating the resource',
        );
        console.error('Error adding client resource:', error);
      } finally {
        stopLoading(); // Stop loading
      }
    },
    [fetchClientResources, startLoading, stopLoading],
  );

  const removeClientResource = useCallback(
    async (id) => {
      try {
        startLoading(); // Start loading
        await deleteClientResources(id);
        fetchClientResources();
      } catch (error) {
        showAlert(
          'error',
          error.response?.data ||
            'An error occurred while updating the resource',
        );
        console.error('Error removing client resource:', error);
      } finally {
        stopLoading(); // Stop loading
      }
    },
    [fetchClientResources, startLoading, stopLoading],
  );

  const editClientResource = useCallback(
    async (id, resourceData) => {
      try {
        startLoading(); // Start loading
        await updateClientResources(id, resourceData); // Send the updated data to the API
        getClientResources(); // Refresh client resources after updating
        showAlert('success', 'Resource updated successfully');
      } catch (error) {
        console.error('Error editing client resource:', error);
        showAlert(
          'error',
          error.response?.data ||
            'An error occurred while updating the resource',
        );
      } finally {
        stopLoading(); // Stop loading
      }
    },
    [startLoading, stopLoading],
  );

  const addNotification = useCallback(
    async (notificationData) => {
      try {
        startLoading(); // Start loading
        await postNotification(notificationData);
        fetchNotifications(); // Refresh notifications after adding
      } catch (error) {
        showAlert(
          'error',
          error.response?.data ||
            'An error occurred while updating the resource',
        );
        console.error('Error adding notification:', error);
      } finally {
        stopLoading(); // Stop loading
      }
    },
    [fetchNotifications, startLoading, stopLoading],
  );

  const removeNotification = useCallback(
    async (id) => {
      try {
        startLoading(); // Start loading
        await deleteNotification(id);
        fetchNotifications(); // Refresh notifications after deleting
      } catch (error) {
        showAlert(
          'error',
          error.response?.data ||
            'An error occurred while updating the resource',
        );
        console.error('Error removing notification:', error);
      } finally {
        stopLoading(); // Stop loading
      }
    },
    [fetchNotifications, startLoading, stopLoading],
  );

  const editNotification = useCallback(
    async (id, notificationData) => {
      try {
        startLoading(); // Start loading
        await updateNotification(id, notificationData);
        showAlert('success', 'Notification updated successfully');
        fetchNotifications(); // Refresh notifications after updating
      } catch (error) {
        console.error('Error editing notification:', error);
        showAlert(
          'error',
          error.response?.data ||
            'An error occurred while updating the notification',
        );
      } finally {
        stopLoading(); // Stop loading
      }
    },
    [fetchNotifications, startLoading, stopLoading],
  );

  return (
    <DashboardContext.Provider
      value={{
        fetchQuickNotes,
        addQuickNote,
        removeQuickNote,
        editQuickNote,
        fetchNotifications,
        fetchClientResources,
        addClientResource,
        removeClientResource,
        editClientResource,
        addNotification,
        removeNotification,
        editNotification,
        quickNotes,
        notifications,
        clientResources, // Provide clientResources in context
        isLoading, // Provide isLoading in context
      }}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;
