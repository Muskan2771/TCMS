import { useState } from "react";

const termConditionModel = () => {
  const initialState = {
    id: 0,
    termCondition: "",
  };

  const [terms, setTerms] = useState(initialState);

  return { terms, setTerms, initialState };
};

export default termConditionModel;
