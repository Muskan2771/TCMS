import { useState } from "react";

/**
 * Represents an offer model.
 * @returns {Object} An object containing the offer state and setter function.
 */
const offerModel = () => {
  const initialState = {
    id: 0,
    offer: "",
    imageUrl: "",
    imagePath: "",
    image: null,
  };

  const [offer, setOffer] = useState(initialState);

  return { offer, setOffer, initialState };
};

export default offerModel;
