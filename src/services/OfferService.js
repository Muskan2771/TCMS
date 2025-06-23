import axiosInstance from "../utils/axiosInstance";
import { showAlert } from "../components/common/toastify/ToastContainer";
import { ConfirmAlert } from "../components";

export const getOffers = async () => {
  try {
    const res = await axiosInstance.get("/api/offers");
    console.log("Offers", res.data);
    return res.data;
  } catch (error) {
    showAlert("error", error.response?.data || "An error occurred");
    throw error;
  }
};

export const createOffer = async (offerData) => {
  try {
    const res = await axiosInstance.post("/api/offers", offerData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Offer Created", res.data);
    showAlert("success", "Offer created successfully");
    return res.data;
  } catch (error) {
    showAlert("error", error.response?.data || "An error occurred");
    throw error;
  }
};

export const updateOffer = async (offerId, offerData) => {
  try {
    const res = await axiosInstance.put(
      `/api/offers/${offerId}`,
      offerData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Offer Updated", res.data);
    showAlert("success", "Offer updated successfully");
    return res.data;
  } catch (error) {
    showAlert("error", error.response?.data || "An error occurred");
    throw error;
  }
};

export const deleteOffer = async (offerId) => {
  const result = await ConfirmAlert({
    confirmBtnText: "Confirm Delete",
  });

  if (!result.isConfirmed) {
    showAlert("error", "Confirmation cancelled");
    throw new Error("Confirmation cancelled");
  }

  try {
    await axiosInstance.delete(`/api/offers/${offerId}`);
    console.log("Offer Deleted");
    showAlert("success", "Offer deleted successfully");
  } catch (error) {
    showAlert("error", error.response?.data || "An error occurred");
    throw error;
  }
};
